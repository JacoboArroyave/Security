import type { Address } from "../models/Address";
import { z } from "zod";


export class AddressValidator {
    private static schema = z.object({
        street: z.string().min(1, "La calle es obligatoria."),
        number: z.string().min(1, "El número es obligatorio."),
        latitude: z.number({ invalid_type_error: "La latitud debe ser un número." }).optional(),
        longitude: z.number({ invalid_type_error: "La longitud debe ser un número." }).optional(),
    });

    static validateField<K extends keyof Address>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }   
}
