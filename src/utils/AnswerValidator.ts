import type { Answer } from '../models/Answer';
import { z } from 'zod';

export class AnswerValidator {
  private static schema = z.object({
    content: z.string().min(1, 'La respuesta no puede estar vacía.'),
    user_id: z.union([
      z.number().int().positive(),
      z.string().min(1, 'Debe seleccionar un usuario.')
    ]),
    security_question_id: z.union([
      z.number().int().positive(),
      z.string().min(1, 'Debe seleccionar una pregunta de seguridad.')
    ])
  });

  static validateField<K extends keyof Answer>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}