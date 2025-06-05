import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod";
import {motion, AnimatePresence} from "motion/react";
import {loginSchema, registerSchema} from "~/validation/zod";
import {Input} from "../ui/input";
import {Form, FormField, FormMessage, FormItem, FormControl, FormLabel} from "~/components/ui/form";
import {Button} from "~/components/ui/button";
import {cn} from "~/lib/utils";
import {Card, CardContent} from "~/components/ui/card";
import {Checkbox} from "~/components/ui/checkbox";
import {Link, useNavigate} from "react-router";
import {useMemo, useState, useEffect, type ComponentProps} from "react";
import {animations} from "~/constants";
import {login, register} from "~/actions/auth.action";
import {useLocalStorage} from "~/hooks/useLocalStorage";
import {userStore} from "~/store/userStore";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger,} from "~/components/ui/popover";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "~/components/ui/select";
import {RadioGroup, RadioGroupItem,} from "~/components/ui/radio-group";

type AuthFormProps = ComponentProps<"div"> & {
    type?: "login" | "register";
}

const AuthForm = ({
                      type = "login",
                      className,
                      ...props
                  }: AuthFormProps) => {
    const {
        authFormVariants,
        authContainerVariants,
        authItemVariants,
        authImageVariants,
        authImageContainerVariants
    } = animations;

    const setUserFromToken = userStore((state) => state.setUserFromToken);
    const isLogin = useMemo(() => type === "login", [type]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState(new Set<string>());
    const navigate = useNavigate();
    const [_, setLocalStorageKey] = useLocalStorage("jwt-coach-now", "");
    const [date, setDate] = useState<Date>();
    const [value, setValue] = useState<number | ''>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const schema = useMemo(() => {
        return isLogin ? loginSchema : registerSchema;
    }, [isLogin]);

    const currentImage = isLogin ? "/coach-swimming.webp" : "/coach-fitness.webp";
    const nextImage = !isLogin ? "/coach-swimming.webp" : "/coach-fitness.webp";

    // Preload des images pour éviter les flashes
    useEffect(() => {
        const preloadImage = (src: string) => {
            if (preloadedImages.has(src)) return;

            const img = new Image();
            img.onload = () => {
                setPreloadedImages(prev => new Set(prev).add(src));
                if (src === currentImage) {
                    setImageLoaded(true);
                }
            };
            img.onerror = () => {
                console.warn(`Failed to preload image: ${src}`);
            };
            img.src = src;
        };

        preloadImage(currentImage);
        preloadImage(nextImage);
    }, [currentImage, nextImage, preloadedImages]);

    useEffect(() => {
        setImageLoaded(preloadedImages.has(currentImage));
    }, [currentImage, preloadedImages]);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            isCoach: false,
            gender: "male",
            hourlyRate: undefined,
            sports: "",
            profilePicture: undefined,
            birthDate: undefined,
            level: "BEGINNER",
        },
    })

    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    useEffect(() => {
        if (password.length && confirmPassword.length && !isLogin) {
            if (confirmPassword !== password) {
                form.setError("confirmPassword", {
                    type: "manual",
                    message: "Les mots de passe ne correspondent pas."
                });
                return;
            }
        }
        form.clearErrors("confirmPassword");
    }, [password, confirmPassword, isLogin]);

    const onSubmit = async (values: z.infer<typeof schema>) => {
        console.log("Données du formulaire soumises :", values);
        try {
            if (isLogin) {
                const {email, password} = values;
                const response = await login({email, password});
                if (response && response.token) {
                    setLocalStorageKey(response.token);
                    setUserFromToken(response.token);
                    navigate("/", {replace: true});
                }
            } else {
                if ('firstName' in values && 'lastName' in values && 'isCoach' in values) {
                    const {firstName, lastName, email, password, isCoach, gender} = values;
                    await register({firstName, lastName, email, password, isCoach: isCoach || false, gender});
                    navigate("/login", {replace: true});
                }
            }
            form.reset();
        } catch (error) {
            if (error instanceof Error && error.message.includes("already exists")) {
                form.setError("email", {
                    type: "manual",
                    message: "Cet email est déjà utilisé."
                });
                return;
            }
            form.setError("root", {
                type: "manual",
                message: error instanceof Error ? error.message : "An error occurred"
            });
        } finally {
            setImageLoaded(false);
            setPreloadedImages(new Set());
        }
    }

    return (
      <>
        <div className={cn("flex flex-col gap-6 h-full", className)} {...props}>
            <Card className="overflow-hidden p-0 h-full flex-1">
                <CardContent className="grid p-0 md:grid-cols-2 h-full flex-1 relative">
                    <motion.div
                        key={`form-${type}`}
                        variants={authFormVariants}
                        initial="hidden"
                        animate={type}
                        className={cn(
                            "relative z-10 h-full",
                            !isLogin && "md:order-last"
                        )}
                        layout
                    >
                        <Form {...form}>
                            <motion.form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col p-6 md:p-10 w-full m-auto h-full justify-center"
                                variants={authContainerVariants}
                                initial="hidden"
                                animate="visible"
                                key={type}
                            >
                                <motion.div className="flex flex-col gap-6" variants={authItemVariants}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`header-${type}`}
                                            initial={{opacity: 0, y: -20}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 20}}
                                            transition={{duration: 0.3}}
                                            className="flex flex-col items-center text-center"
                                        >
                                            {isLogin ? (
                                                <>
                                                    <h1 className="text-2xl font-bold">
                                                        De retour ?
                                                    </h1>
                                                    <p className="text-muted-foreground text-balance">
                                                        Se connecter pour continuer
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <h1 className="text-2xl font-bold">
                                                        Bienvenue !
                                                    </h1>
                                                    <p className="text-muted-foreground text-balance">
                                                        Créer un compte pour commencer
                                                    </p>
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {!isLogin && (
                                            <motion.div
                                                initial={{opacity: 0, height: 0}}
                                                animate={{opacity: 1, height: "auto"}}
                                                exit={{opacity: 0, height: 0}}
                                                transition={{duration: 0.4, ease: "easeInOut"}}
                                                className="grid grid-cols-2 gap-3"
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="firstName"
                                                    render={({field}) => (
                                                        <FormItem className='grid gap-0'>
                                                            <FormLabel>Prénom</FormLabel>
                                                            <FormControl className="mt-2">
                                                                <Input placeholder="John" {...field} />
                                                            </FormControl>
                                                            <div className="min-h-5 flex items-start mt-1">
                                                                <FormMessage/>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="lastName"
                                                    render={({field}) => (
                                                        <FormItem className='grid gap-0'>
                                                            <FormLabel>Nom</FormLabel>
                                                            <FormControl className="mt-2">
                                                                <Input placeholder="Doe" {...field} />
                                                            </FormControl>
                                                            <div className="min-h-5 flex items-start mt-1">
                                                                <FormMessage/>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.div variants={authItemVariants}>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem className='grid gap-0'>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl className="mt-3">
                                                        <Input placeholder="john.doe@example.com" {...field} />
                                                    </FormControl>
                                                    <div className="min-h-5 flex items-start mt-1">
                                                        <FormMessage/>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div variants={authItemVariants}>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({field}) => (
                                                <FormItem className='grid gap-0'>
                                                    <FormLabel>Mot de passe</FormLabel>
                                                    <FormControl className="mt-3">
                                                        <Input placeholder="Mot de passe" type="password" {...field} />
                                                    </FormControl>
                                                    <div className="min-h-5 flex items-start mt-1">
                                                        <FormMessage/>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <AnimatePresence>
                                        {!isLogin && (
                                            <motion.div
                                                initial={{opacity: 0, height: 0, y: -20}}
                                                animate={{opacity: 1, height: "auto", y: 0}}
                                                exit={{opacity: 0, height: 0, y: -20}}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: "easeInOut",
                                                    height: {delay: 0.1}
                                                }}
                                                className="flex flex-col gap-4"
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="confirmPassword"
                                                    render={({field}) => (
                                                        <FormItem className='grid gap-0'>
                                                            <FormLabel>Confirmer le mot de passe</FormLabel>
                                                            <FormControl className="mt-3">
                                                                <Input placeholder="Confirmer le mot de passe"
                                                                       type="password" {...field} />
                                                            </FormControl>
                                                            <div className="min-h-5 flex items-start mt-1">
                                                                <FormMessage/>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="isCoach"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <motion.div
                                                                initial={{opacity: 0, scale: 0.95}}
                                                                animate={{opacity: 1, scale: 1}}
                                                                transition={{
                                                                    delay: 0.2,
                                                                    duration: 0.3,
                                                                    ease: "easeOut"
                                                                }}
                                                            >
                                                                <FormLabel
                                                                    className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                                                    htmlFor="coach-checkbox"
                                                                >
                                                                    <FormControl className="mt-3">
                                                                        <Checkbox
                                                                            id="coach-checkbox"
                                                                            checked={field.value === true}
                                                                            onCheckedChange={(checked) => {
                                                                                field.onChange(checked);
                                                                                if (checked === true) {
                                                                                    setIsDialogOpen(true);
                                                                                }
                                                                            }}
                                                                            onBlur={field.onBlur}
                                                                            name={field.name}
                                                                            ref={field.ref}
                                                                            className="mt-0.5 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 transition-all duration-200"
                                                                            aria-label="Je suis coach"
                                                                        />
                                                                    </FormControl>
                                                                    <div className="grid gap-1.5 font-normal flex-1">
                                                                        <p className="text-sm leading-none font-medium">
                                                                            Je suis coach
                                                                        </p>
                                                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                                                            Cochez cette case si vous êtes un coach
                                                                            et souhaitez proposer vos services.
                                                                        </p>
                                                                    </div>
                                                                </FormLabel>
                                                            </motion.div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.div variants={authItemVariants}>
                                        <motion.div variants={authItemVariants}>
                                            <Button type="submit" className="w-full cursor-pointer"
                                                    disabled={!form.formState.isValid}>
                                                {isLogin ? "Se connecter" : "Créer un compte"}
                                            </Button>
                                        </motion.div>

                                        {/* Container fixe pour les erreurs pour éviter le redimensionnement */}
                                        <div className="h-6 mt-2 flex items-start">
                                            <AnimatePresence>
                                                {form.formState.errors.root?.message && (
                                                    <motion.p
                                                        initial={{opacity: 0, y: -10}}
                                                        animate={{opacity: 1, y: 0}}
                                                        exit={{opacity: 0, y: -10}}
                                                        transition={{duration: 0.2}}
                                                        className="text-sm text-red-500"
                                                    >
                                                        {form.formState.errors.root.message}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={authItemVariants} className="text-center text-sm">
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={`link-${type}`}
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration: 0.2}}
                                            >
                                                {isLogin ? (
                                                    <>
                                                        Pas encore de compte ?{" "}
                                                        <Link to="/register" className="underline underline-offset-4">
                                                            S'inscrire
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        Déjà un compte ?{" "}
                                                        <Link to="/login" className="underline underline-offset-4">
                                                            Se connecter
                                                        </Link>
                                                    </>
                                                )}
                                            </motion.span>
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.div>
                            </motion.form>
                        </Form>
                    </motion.div>

                    <motion.div
                        className="bg-muted relative hidden md:block overflow-hidden h-full"
                        variants={authImageContainerVariants}
                        initial="login"
                        animate={type}
                        layout
                    >
                        <AnimatePresence>
                            {!imageLoaded && (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center"
                                >
                                    {/* Skeleton loader */}
                                    <div
                                        className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"/>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImage}
                                src={currentImage}
                                alt="Image d'illustration"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                variants={authImageVariants}
                                initial="initial"
                                animate={imageLoaded ? "loaded" : "initial"}
                                exit="exit"
                                onLoad={() => setImageLoaded(true)}
                                style={{
                                    // Évite le flash pendant le chargement
                                    visibility: imageLoaded ? 'visible' : 'hidden'
                                }}
                            />
                        </AnimatePresence>

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                            initial={{opacity: 0}}
                            animate={{opacity: imageLoaded ? 1 : 0}}
                            transition={{delay: 0.3, duration: 0.4}}
                        />
                    </motion.div>
                </CardContent>
            </Card>
        </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Form {...form}>
              <form>
                  <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                          <DialogTitle>Espace Coach</DialogTitle>
                          <DialogDescription>
                              Veuillez remplir ses informations afin de finaliser votre inscription :)
                          </DialogDescription>
                      </DialogHeader>

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="grid w-full max-w-sm gap-3">
                              <FormLabel>Votre sexe</FormLabel>
                              <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    name={field.name}
                                    className="flex gap-5"
                                  >
                                      <div className="flex items-center gap-2">
                                          <RadioGroupItem value="male" id="gender-male" />
                                          <Label htmlFor="gender-male">Homme</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <RadioGroupItem value="female" id="gender-female" />
                                          <Label htmlFor="gender-female">Femme</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <RadioGroupItem value="other" id="gender-other" />
                                          <Label htmlFor="gender-other">Autre</Label>
                                      </div>
                                  </RadioGroup>
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                        )}
                      />

                          {/*Input hourlyrate*/}
                          <div className="grid w-full max-w-sm items-center gap-3">
                              <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Taux horaires (€)</FormLabel>
                                      <FormControl>
                                          <Input type="number" step="0.01" placeholder="45.99€" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />

                          </div>

                          {/*Profil Picture*/}
                          <div className="grid w-full max-w-sm items-center gap-3">
                              <FormField
                                control={form.control}
                                name="profilePicture"
                                render={({ field }) => (
                                  <FormItem className="grid w-full max-w-sm gap-3">
                                      <FormLabel>Photo de profil</FormLabel>
                                      <FormControl>
                                          <Input
                                            type="file"
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                          />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />

                          </div>

                          {/*Birthday date*/}
                          <div className="grid w-full max-w-sm items-center gap-3">
                              <FormField
                                control={form.control}
                                name="birthDate"
                                render={({ field }) => (
                                  <FormItem className="grid w-full max-w-sm gap-3">
                                      <FormLabel>Date de naissance</FormLabel>
                                      <Popover>
                                          <PopoverTrigger asChild>
                                              <FormControl>
                                                  <Button
                                                    variant="outline"
                                                    className={cn(
                                                      "justify-start text-left font-normal",
                                                      !field.value && "text-muted-foreground"
                                                    )}
                                                  >
                                                      <CalendarIcon />
                                                      {field.value ? format(field.value, "PPP") : <span>Choisir une date</span>}
                                                  </Button>
                                              </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto p-0" align="start">
                                              <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                              />
                                          </PopoverContent>
                                      </Popover>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />

                          </div>

                          {/*Sports list*/}
                          <div className="grid w-full max-w-sm items-center gap-3">
                              <FormField
                                control={form.control}
                                name="sports"
                                render={({ field }) => (
                                  <FormItem className="grid w-full max-w-sm gap-3">
                                      <FormLabel>Choix des sports</FormLabel>
                                      <Select value={field.value} onValueChange={field.onChange}>
                                          <FormControl>
                                              <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Choisir des sports" />
                                              </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                              <SelectGroup>
                                                  <SelectLabel>Sports</SelectLabel>
                                                  <SelectItem value="apple">Apple</SelectItem>
                                                  <SelectItem value="banana">Banana</SelectItem>
                                                  <SelectItem value="blueberry">Blueberry</SelectItem>
                                                  <SelectItem value="grapes">Grapes</SelectItem>
                                                  <SelectItem value="pineapple">Pineapple</SelectItem>
                                              </SelectGroup>
                                          </SelectContent>
                                      </Select>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />

                          </div>

                          {/*Levels */}
                          <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                              <FormItem className="grid gap-3">
                                  <FormLabel>Votre niveau</FormLabel>
                                  <FormControl>
                                      <RadioGroup
                                        className="flex gap-5"
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                          <div className="flex items-center gap-3">
                                              <RadioGroupItem value="BEGINNER" id="r1" />
                                              <Label htmlFor="r1">BEGINNER</Label>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <RadioGroupItem value="MEDIUM" id="r2" />
                                              <Label htmlFor="r2">MEDIUM</Label>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <RadioGroupItem value="HIGHLEVEL" id="r3" />
                                              <Label htmlFor="r3">HIGHLEVEL</Label>
                                          </div>
                                      </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                            )}
                          />

                          </div>

                      <DialogFooter>
                          <DialogClose asChild>
                              <Button variant="outline">Annuler</Button>
                          </DialogClose>
                          <Button type="submit">Valider</Button>
                      </DialogFooter>
                  </DialogContent>
              </form>
                  </Form>
          </Dialog>
      </>
    );
};

export default AuthForm;
