import type { DigitalSignature } from '../models/DigitalSignature';
import { z } from 'zod';

export class DigitalSignatureValidator {
  private static schema = z.object({
    photo: z.string().url('Debe proporcionar una URL válida para la firma digital.')
  });

  static validateField<K extends keyof DigitalSignature>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
