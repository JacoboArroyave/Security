import { z } from 'zod';

export const ProfileValidator = z.object({
  phone: z.string().min(7, 'El teléfono es requerido'),
  photo: z.any().optional(),
  user_id: z.string().min(1, 'Debe seleccionar un usuario'),
});

// Esta es la función que valida un campo individualmente
export function validateField(field: string, value: any) {
  const fieldSchema = ProfileValidator.shape[field as keyof typeof ProfileValidator.shape];
  if (!fieldSchema) return true;

  try {
    fieldSchema.parse(value);
    return true;
  } catch (e: any) {
    return e.errors?.[0]?.message || 'Campo inválido';
  }
}
