import type { Role } from '../models/Role';
import { z } from 'zod';

export class RoleValidator {
  private static schema = z.object({
    name: z.string().min(1, 'El nombre del rol no puede estar vacío.'),
    description: z.string().optional(),
  });

  static validateField<K extends keyof Role>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
