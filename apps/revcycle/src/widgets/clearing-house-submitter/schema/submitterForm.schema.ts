import { z } from 'zod';
import {
  validate
} from '@psychplus/form';

export const submitterFormSchema = z.object({
  id: validate.optionalString,
  name: validate.requiredString,
  username: validate.requiredString,
  password: validate.requiredString,
  email: validate.requiredString.email('Please provide valid email'),
  submitterId: validate.requiredString,
  contactPerson: validate.optionalString,
  phone: validate.optionalString,
  fax: validate.optionalString,
  receiverId: validate.requiredString,
  practiceId: validate.requiredString,
  addressLine1: validate.requiredString,
  city: validate.optionalString,
  state: validate.requiredString,
  zip: validate.requiredString.max(5),
  addressLine2: validate.optionalString
});

export type SubmitterFormSchema = z.infer<typeof submitterFormSchema>;