import type { Device } from '../models/Device';
import { z } from 'zod';

export class DeviceValidator {
  private static schema = z.object({
    name: z.string().min(2, 'El nombre del dispositivo es obligatorio.'),
    ip: z.string().min(7, 'La IP es obligatoria.'),
    operating_system: z.string().min(2, 'El sistema operativo es obligatorio.')
  });

  static validateField<K extends keyof Device>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
