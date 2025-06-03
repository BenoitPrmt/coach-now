import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse e-mail valide."),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères.")
})

export const registerSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis."),
    lastName: z.string().min(1, "Le nom est requis."),
    email: z.string().email("Veuillez entrer une adresse e-mail valide."),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
    confirmPassword: z.string().min(8, "La confirmation du mot de passe doit comporter au moins 8 caractères.")
}).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
})