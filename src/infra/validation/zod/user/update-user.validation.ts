import { z } from 'zod';

const NameRequiredError = 'Name is required';

const updateUserValidation = z.object({
  name: z
    .string({
      required_error: NameRequiredError,
      message: NameRequiredError,
    })
    .min(1, NameRequiredError)
    .nonempty(NameRequiredError),
  email: z.string().email('Invalid email format'),
});

export { updateUserValidation };
