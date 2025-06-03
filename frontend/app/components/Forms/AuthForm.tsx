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
import {Link, useNavigate} from "react-router";
import {useMemo, useState, useEffect} from "react";
import {animations} from "~/constants";
import {login, register} from "~/actions/auth.action";

type AuthFormProps = React.ComponentProps<"div"> & {
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

    const isLogin = useMemo(() => type === "login", [type]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState(new Set<string>());
    const navigate = useNavigate();

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
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
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
        try {
            if (isLogin) {
                const {email, password} = values;
                await login({email, password});
                navigate("/", {replace: true});
            } else {
                if ('firstName' in values && 'lastName' in values) {
                    const {firstName, lastName, email, password} = values;
                    await register({firstName, lastName, email, password});
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
        }
    }

    return (
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
                                className="flex flex-col gap-4 p-6 md:p-10 w-full m-auto h-full justify-center"
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
                                                        <FormItem className='grid gap-3'>
                                                            <FormLabel>Prénom</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="John" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="lastName"
                                                    render={({field}) => (
                                                        <FormItem className='grid gap-3'>
                                                            <FormLabel>Nom</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Doe" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
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
                                                <FormItem className='grid gap-3'>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john.doe@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div variants={authItemVariants}>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({field}) => (
                                                <FormItem className='grid gap-3'>
                                                    <FormLabel>Mot de passe</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Mot de passe" type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <AnimatePresence>
                                        {!isLogin && (
                                            <motion.div
                                                initial={{opacity: 0, height: 0}}
                                                animate={{opacity: 1, height: "auto"}}
                                                exit={{opacity: 0, height: 0}}
                                                transition={{duration: 0.4, ease: "easeInOut"}}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="confirmPassword"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Confirmer le mot de passe</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Confirmer le mot de passe"
                                                                       type="password" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
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

                                        {form.formState.errors.root?.message && (
                                            <motion.p
                                                variants={authItemVariants}
                                                className="text-sm text-red-500 mt-2"
                                            >
                                                {form.formState.errors.root.message}
                                            </motion.p>
                                        )}
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
    );
};

export default AuthForm;