import {z} from "zod";

export const profileSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis").min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(1, "Le nom est requis").min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
});

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
    firstName: z.string().min(1, "Le prénom est requis."),
    lastName: z.string().min(1, "Le nom est requis."),
    confirmPassword: z.string().min(8, "La confirmation du mot de passe doit comporter au moins 8 caractères."),
    isCoach: z.boolean().default(false),
    gender: z.enum(["MALE", "FEMALE"], { required_error: "Le genre est requis." }),
    hourlyRate: z.coerce.number().optional(),
    sports: z.string().array().optional(),
    profilePicture: z.string().optional(),
    birthDate: z.date().optional(),
    level: z.enum(["BEGINNER", "MEDIUM", "HIGHLEVEL"]).optional(),
}).superRefine((data, ctx) => {

    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Les mots de passe ne correspondent pas."
        });
    }

    if (data.isCoach) {
        if (data.hourlyRate === undefined) {
            ctx.addIssue({
                code: "custom",
                path: ["hourlyRate"],
                message: "Veuillez renseigner un taux horaires."
            });
        }
        if (!data.sports || data.sports.length === 0) {
            ctx.addIssue({
                code: "custom",
                path: ["sports"],
                message: "Sélectionnez au moins un sport."
            });
        }
        if (!data.birthDate) {
            ctx.addIssue({
                code: "custom",
                path: ["birthDate"],
                message: "La date de naissance est requise."
            });
        }
        if (!data.level) {
            ctx.addIssue({
                code: "custom",
                path: ["level"],
                message: "Le niveau est requis."
            });
        }
    }
});
