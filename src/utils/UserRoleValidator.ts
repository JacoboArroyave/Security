import { z } from "zod";

export class UserRoleValidator {
    static schema = z.object({
        user_id: z.union([
            z.string().min(1, "Seleccione un usuario."),
            z.number().min(1, "Seleccione un usuario.")
        ]),
        role_id: z.union([
            z.string().min(1, "Seleccione un rol."),
            z.number().min(1, "Seleccione un rol.")
        ]),
        startAt: z.string().min(1, "La fecha de inicio es obligatoria."),
        endAt: z.string().min(1, "La fecha de fin es obligatoria.")
    });

    static validateField(field: "user_id" | "role_id" | "startAt" | "endAt", value: any) {
        let fieldSchema;
        if (field === 'user_id') fieldSchema = this.schema.pick({ user_id: true });
        else if (field === 'role_id') fieldSchema = this.schema.pick({ role_id: true });
        else if (field === 'startAt') fieldSchema = this.schema.pick({ startAt: true });
        else fieldSchema = this.schema.pick({ endAt: true });
        return fieldSchema.safeParse({ [field]: value });
    }

    static safeParse(obj: any) {
        return this.schema.safeParse(obj);
    }
}
