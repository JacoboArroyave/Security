import type { Password } from "../models/Password";
import { z } from "zod";

export class PasswordValidator {
    private static schema = z.object({
        content: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
        startAt: z.string().optional(),
        endAt: z.string().optional(),
    });

    static validateField<K extends keyof Password>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
