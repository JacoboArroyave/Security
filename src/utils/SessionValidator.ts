import type { Session } from "../models/Session";
import { z } from "zod";

export class SessionValidator {
  private static schema = z.object({
    token: z.string().min(10, "El token debe tener al menos 10 caracteres."),
    expiration: z.string().refine(
      (val) => !isNaN(Date.parse(val)),
      { message: "La fecha de expiración no es válida." }
    ),
    FACode: z.string().min(4, "El código FA debe tener al menos 4 caracteres."),
    state: z.string().min(1, "El estado es obligatorio."),
    user_id: z.number().min(1, "El usuario es obligatorio.")
  });

  static validateField<K extends keyof Session>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
