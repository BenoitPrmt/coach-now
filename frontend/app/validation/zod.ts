import {z} from "zod";

export const loginSchema = z.object({
    email: z.string({
        required_error: "L'adresse e-mail est requise."
    }).email("Veuillez entrer une adresse e-mail valide."),
    password: z.string({
        required_error: "Le mot de passe est requis."
    }).min(8, "Le mot de passe doit comporter au moins 8 caractères.")
})

export const registerSchema = z.object({
    ...loginSchema.shape,
    firstName: z.string({
        required_error: "Le prénom est requis."
    }).min(1, "Le prénom est requis."),
    lastName: z.string({
        required_error: "Le nom est requis."
    }).min(1, "Le nom est requis."),
    confirmPassword: z.string({
        required_error: "La confirmation du mot de passe est requise."
    }).min(8, "La confirmation du mot de passe doit comporter au moins 8 caractères.")
}).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
})