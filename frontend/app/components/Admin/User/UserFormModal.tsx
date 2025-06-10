import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { User } from "~/types";
import { useState } from "react";
import {useUser} from "~/hooks/useUser";
import {updateUser} from "~/actions/user.action";
import {register} from "~/actions/auth.action";

const userFormSchema = z.object({
    firstName: z
        .string()
        .min(1, "Le prénom est requis")
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
    lastName: z
        .string()
        .min(1, "Le nom est requis")
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Format d'email invalide"),
    password: z
        .string()
        .optional(),
    role: z.enum(["USER", "COACH", "ADMIN"], {
        required_error: "Veuillez sélectionner un rôle",
    }),
});

type UserFormData = z.infer<typeof userFormSchema>;

type Props = {
    mode: "create" | "edit";
    user?: User;
    onSubmit?: (data: UserFormData) => void | Promise<void>;
}

export function UserFormModal({ mode, user, onSubmit }: Props) {
    const [open, setOpen] = useState(false);

    const { userToken } = useUser();

    if (mode !== "create" && !user) {
        throw new Error("User is required for edit mode");
    }

    const form = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            password: "",
            role: user?.role || "USER",
        },
    });

    const handleSubmit = async (data: UserFormData) => {
        console.log("Form data submitted:", data);
        try {
            if (mode === "edit" && user) {
                updateUser(userToken, user.id, data).then((updatedUser) => {
                    console.log("User updated successfully:", updatedUser);
                }).catch((err) => {
                    console.error("Error updating user:", err);
                })
            } else if (mode === "create") {
                const registerData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password || "",
                }
                register(registerData).then((data) => {
                    console.log("User created successfully:", data);
                }).catch((err) => {
                    console.error("Error creating user:", err);
                })
            }
            setOpen(false);
            form.reset();
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {mode === "create" ? (
                    <Button>
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        Créer un utilisateur
                    </Button>
                ) : (
                    <Button variant="secondary" size="icon">
                        <EditIcon className="w-4 h-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create"
                            ? "Créer un utilisateur"
                            : `Modifier ${user?.firstName} ${user?.lastName}`
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Remplissez les informations pour créer un nouvel utilisateur."
                            : "Modifiez les informations de l'utilisateur."
                        }
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Prénom" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nom" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="exemple@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {mode === "create" && (
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Mot de passe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rôle</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner un rôle" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="USER">Utilisateur</SelectItem>
                                            <SelectItem value="COACH">Coach</SelectItem>
                                            <SelectItem value="ADMIN">Administrateur</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Annuler
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Enregistrement..."
                                    : mode === "create"
                                        ? "Créer"
                                        : "Modifier"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}