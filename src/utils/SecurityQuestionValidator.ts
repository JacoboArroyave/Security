import type { SecurityQuestion } from '../models/SecurityQuestion';
import { z } from 'zod';

export class SecurityQuestionValidator {
  private static schema = z.object({
    name: z.string().min(3, 'El nombre de la pregunta debe tener al menos 3 caracteres.'),
    description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres.')
  });

  static validateField<K extends keyof SecurityQuestion>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
