import { z } from 'zod';

// --- Login Schema ---
export const loginSchema = z.object({
    phone: z.string()
        .min(1, "Le numéro de téléphone est requis")
        .regex(/^\d{10}$/, "Le numéro doit comporter 10 chiffres"),
    password: z.string().min(1, "Le mot de passe est requis"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;


// --- Register Schema ---
export const registerSchema = z.object({
    fullName: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
// Note: RegisterFormErrors needs to match the structure expected by the UI. 
// z.infer returns an object with the data types.
// We manually define the error type to allow optional strings for each field.
export type RegisterFormErrors = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};
