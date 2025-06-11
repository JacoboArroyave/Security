import { z } from 'zod';

export class ProfileValidator {
  // Esquema general del perfil
  private static schema = z.object({
    phone: z.string()
      .min(10, 'El número de teléfono debe tener al menos 10 caracteres.'),
      // .max(20, 'El número de teléfono no debe superar los  caracteres.'),
    
    photo: z.union([
      z.instanceof(File).refine(
        (file) => file.type.startsWith('image/'),
        { message: 'Debe seleccionar una imagen válida.' }
      ).refine(
        (file) => file.size <= 10 * 1024 * 1024,
        { message: 'La imagen debe ser menor a 10MB.' }
      ),
      z.string(),    // Por si ya viene una URL o base64
      z.null(),
      z.undefined()
    ]).optional(),

    user_id: z.union([
      z.number(),
      z.string().regex(/^\d+$/, 'ID de usuario inválido')
    ])
  });

  // Validación de campo único
  static validateField<K extends keyof z.infer<typeof ProfileValidator.schema>>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
