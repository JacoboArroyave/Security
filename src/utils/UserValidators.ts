import type { User } from "../models/User";
import { z } from "zod";

export class UserValidator {
    private static schema = z.object({
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
        email: z.string().email("Correo inválido."),
     
    });

    static validateField<K extends keyof User>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
