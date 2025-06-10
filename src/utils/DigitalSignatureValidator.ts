import type { DigitalSignature } from '../models/DigitalSignature';
import { z } from 'zod';

export class DigitalSignatureValidator {
  private static schema = z.object({
    photo: z.union([
      z.instanceof(File).refine((file) => {
        return file.type.startsWith('image/');
      }, { message: 'Debe seleccionar una imagen válida.' })
      .refine((file) => {
        const maxSize = 10 * 1024 * 1024;
        return file.size <= maxSize;
      }, { message: 'La imagen debe ser menor a 10MB.' }),
      z.null(),
      z.undefined(),
      z.string()
    ]).optional()
  });

  static validateField<K extends keyof DigitalSignature>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}