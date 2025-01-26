import { z } from 'zod';

const createUserValidator = z.object({
  name: z.string().min(1, 'Name is required').nonempty('Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8),
});

export { createUserValidator as createUserSchema };
