import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod";
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

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 h-full">
                {/*Reversing grid when register*/}
                <CardContent
                    className={cn("grid p-0 md:grid-cols-2 h-full", type === "register" && "md:grid-cols-2-reverse")}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col m-auto w-full">
                            <div className="flex flex-col gap-6">
                                {
                                    type === "login" ?
                                        (
                                            <div className="flex flex-col items-center text-center">
                                                <h1 className="text-2xl font-bold">
                                                    De retour ?
                                                </h1>
                                                <p className="text-muted-foreground text-balance">
                                                    Se connecter pour continuer
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center text-center">
                                                <h1 className="text-2xl font-bold">
                                                    Bienvenue !
                                                </h1>
                                                <p className="text-muted-foreground text-balance">
                                                    Créer un compte pour commencer
                                                </p>
                                            </div>
                                        )
                                }
                                {
                                    type === "register" && (
                                        <div className="grid grid-cols-2 gap-3">
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
                                        </div>
                                    )
                                }
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
                                {
                                    type === "register" && (
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
                                    )
                                }
                                <Button type="submit" className="w-full cursor-pointer">
                                    {
                                        type === "login" ? "Se connecter" : "Créer un compte"
                                    }
                                </Button>
                                <div className="text-center text-sm">
                                    {
                                        type === "login" ? (
                                            <span>
                                                Pas encore de compte ?{" "}
                                                <Link to="/register" className="underline underline-offset-4">
                                                    S'inscrire
                                                </Link>
                                            </span>
                                        ) : (
                                            <span>
                                                Déjà un compte ?{" "}
                                                <Link to="/login" className="underline underline-offset-4">
                                                    Se connecter
                                                </Link>
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/coach-swimming.webp"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthForm;
