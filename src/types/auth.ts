import z from 'zod';

export const registerFormSchema = z
    .object({
        name: z.string().min(1, 'Nome obrigatório'),
        email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
        password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .regex(
                /[A-Z]/,
                'A senha deve conter pelo menos uma letra maiúscula'
            )
            .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
            .regex(
                /[^A-Za-z0-9]/,
                'A senha deve conter pelo menos um caractere especial'
            ),
        confirmPassword: z.string().min(1, 'Confirme sua senha'),
        organizationName: z.string().min(1, 'Organização obrigatória'),
        plan: z.literal(['free', 'basic', 'premium']),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });

export type RegistrationData = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
    email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
    password: z.string().min(1, 'Senha obrigatória'),
});

export type LoginData = z.infer<typeof loginFormSchema>;

export const forgetPasswordFormSchema = z.object({
    email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordFormSchema>;

export const resetPasswordFormSchema = z
    .object({
        password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .regex(
                /[A-Z]/,
                'A senha deve conter pelo menos uma letra maiúscula'
            )
            .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
            .regex(
                /[^A-Za-z0-9]/,
                'A senha deve conter pelo menos um caractere especial'
            ),
        confirmPassword: z.string().min(1, 'Confirme sua senha'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });

export type ResetPasswordData = z.infer<typeof resetPasswordFormSchema>;
