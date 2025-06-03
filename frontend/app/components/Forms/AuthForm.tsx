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
import {Link} from "react-router";

type AuthFormProps = React.ComponentProps<"div"> & {
    type?: "login" | "register";
}

const AuthForm = ({
                      type = "login",
                      className,
                      ...props
                  }: AuthFormProps) => {
    const schema = type === "login" ? loginSchema : registerSchema;
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof schema>) => {

    }

    // Animations variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.3}
        }
    };

    const formVariants = {
        login: {
            x: 0,
            transition: {duration: 0.6, ease: "easeInOut"}
        },
        register: {
            x: 0,
            transition: {duration: 0.6, ease: "easeInOut"}
        }
    };

    const imageVariants = {
        login: {
            x: 0,
            transition: {duration: 0.6, ease: "easeInOut"}
        },
        register: {
            x: 0,
            transition: {duration: 0.6, ease: "easeInOut"}
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 h-full">
                <CardContent className="grid p-0 md:grid-cols-2 h-full relative">
                    <motion.div
                        key={`form-${type}`}
                        variants={formVariants}
                        initial="hidden"
                        animate={type}
                        className={cn(
                            "relative z-10",
                            type === "register" ? "md:order-last" : ""
                        )}
                        layout
                    >
                        <Form {...form}>
                            <motion.form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-4 p-6 md:p-10 w-full m-auto h-full justify-center"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                key={type}
                            >
                                <motion.div className="flex flex-col gap-6" variants={itemVariants}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`header-${type}`}
                                            initial={{opacity: 0, y: -20}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 20}}
                                            transition={{duration: 0.3}}
                                            className="flex flex-col items-center text-center"
                                        >
                                            {type === "login" ? (
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
                                        {type === "register" && (
                                            <motion.div
                                                initial={{opacity: 0, height: 0}}
                                                animate={{opacity: 1, height: "auto"}}
                                                exit={{opacity: 0, height: 0}}
                                                transition={{duration: 0.4, ease: "easeInOut"}}
                                                className="grid grid-cols-2 gap-3 overflow-hidden"
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

                                    <motion.div variants={itemVariants}>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem className='grid gap-3'>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="m@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
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
                                        {type === "register" && (
                                            <motion.div
                                                initial={{opacity: 0, height: 0}}
                                                animate={{opacity: 1, height: "auto"}}
                                                exit={{opacity: 0, height: 0}}
                                                transition={{duration: 0.4, ease: "easeInOut"}}
                                                className="overflow-hidden"
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="confirmPassword"
                                                    render={({field}) => (
                                                        <FormItem className='grid gap-3'>
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

                                    <motion.div variants={itemVariants}>
                                        <Button type="submit" className="w-full cursor-pointer">
                                            {type === "login" ? "Se connecter" : "Créer un compte"}
                                        </Button>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="text-center text-sm">
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={`link-${type}`}
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration: 0.2}}
                                            >
                                                {type === "login" ? (
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
                        className="bg-muted relative hidden md:block"
                        variants={imageVariants}
                        initial="login"
                        animate={type}
                        layout
                    >
                        <motion.img
                            src="/coach-swimming.webp"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            initial={{scale: 1.1, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{duration: 0.8, ease: "easeOut"}}
                        />
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthForm;