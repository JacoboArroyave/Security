import { z } from "zod";

export class RolePermissionValidator {
    static schema = z.object({
        permission_id: z.union([
            z.string().min(1, "Seleccione un permiso."),
            z.number().min(1, "Seleccione un permiso.")
        ]),
        role_id: z.union([
            z.string().min(1, "Seleccione un rol."),
            z.number().min(1, "Seleccione un rol.")
        ])
    });

    static validateField(field: "permission_id" | "role_id", value: any) {
        let fieldSchema = this.schema.pick({ [field]: true });
        return fieldSchema.safeParse({ [field]: value });
    }

    static safeParse(obj: any) {
        return this.schema.safeParse(obj);
    }
}
