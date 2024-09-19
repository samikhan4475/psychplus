import { z } from 'zod';
import {
  validate
} from '@psychplus/form';

export const EdiFormSchema = z.object({
  id: validate.optionalString,
  receiverId: validate.requiredString,
  receiverName: validate.optionalString,
  insurancePayerName: validate.optionalString,
  insurancePlanId: validate.requiredString,
  payerId: validate.requiredString,
  isEligibility: validate.nullOrBoolean,
  isElectronic: validate.nullOrBoolean,
  isInstitutional: validate.nullOrBoolean,
  isDental: validate.nullOrBoolean,
  isPaperCms1500: validate.nullOrBoolean,
  isPaperUb04: validate.nullOrBoolean,
});

export type EdiFormSchema = z.infer<typeof EdiFormSchema>;