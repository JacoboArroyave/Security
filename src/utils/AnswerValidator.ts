import type { Answer } from '../models/Answer';
import { z } from 'zod';

export class AnswerValidator {
  private static schema = z.object({
    response: z.string().min(1, 'La respuesta no puede estar vacía.'),
    user_id: z.number({ invalid_type_error: 'El ID de usuario debe ser un número.' }).int().positive(),
    security_question_id: z.number({ invalid_type_error: 'El ID de pregunta debe ser un número.' }).int().positive()
  });

  static validateField<K extends keyof Answer>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
