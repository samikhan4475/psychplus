import { CalendarDate } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import z from 'zod'
import { INVALID_RANGE_ERROR, OUT_OF_RANGE_ERROR } from '../constants'
import { validateDate } from '../utils'

const numericFieldsValidation = z.coerce.number().optional().nullable()

const providerCodingViewSchema = z
  .object({
    startingDate: z.custom<DateValue>().optional(),
    endingDate: z.custom<DateValue>().optional(),
    name: z.string().optional(),
    age: z.array(z.string()).optional(),
    gender: z.string().optional(),
    dateOfBirth: z.custom<DateValue>().optional(),
    locationIds: z.string().optional(),
    serviceIds: z
      .array(z.string())
      .refine((value) => value.every((item) => typeof item === 'string'), {
        message: 'Array must be empty or contain only strings',
      }),
    providerTypes: z.string().optional(),
    unitIds: z.string().optional(),
    roomIds: z.string().optional(),
    groupIds: z.string().optional(),
    primaryInsuranceNames: z.string().optional(),
    secondaryInsuranceNames: z.string().optional(),
    visitTypes: z.string().optional(),
    visitSequences: z.string().optional(),
    visitMediums: z.string().optional(),
    appointmentStatuses: z
      .array(z.string())
      .refine((value) => value.every((item) => typeof item === 'string'), {
        message: 'Array must be empty or contain only strings',
      }),
    patientInsuranceVerificationStatuses: z.string().optional(),
    diagnosisCode: z.string().optional(),
    cptCode: z.string().optional(),
    dateOfAdmissionStart: z.custom<DateValue>().optional(),
    dateOfAdmissionEnd: z.custom<DateValue>().optional(),
    lengthOfStayMin: numericFieldsValidation,
    lengthOfStayMax: numericFieldsValidation,
    lastCoverageDateStart: z.custom<DateValue>().optional(),
    lastCoverageDateEnd: z.custom<DateValue>().optional(),
    legalStatuses: z.string().optional(),
    copayDueMin: numericFieldsValidation,
    copayDueMax: numericFieldsValidation,
    coInsuranceDueMin: numericFieldsValidation,
    coInsuranceDueMax: numericFieldsValidation,
    balanceDueMin: numericFieldsValidation,
    balanceDueMax: numericFieldsValidation,
    noteSignedStatuses: z.string().optional(),
    facilityAdmissionIds: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const {
      startingDate,
      endingDate,
      dateOfAdmissionStart,
      dateOfAdmissionEnd,
      lastCoverageDateStart,
      lastCoverageDateEnd,
    } = data
    const startDateFields = [
      {
        name: 'startingDate',
        validity: startingDate ? validateDate(startingDate, endingDate) : 0,
      },
      {
        name: 'dateOfAdmissionStart',
        validity: dateOfAdmissionStart
          ? validateDate(dateOfAdmissionStart, dateOfAdmissionEnd)
          : 0,
      },
      {
        name: 'lastCoverageDateStart',
        validity: lastCoverageDateStart
          ? validateDate(lastCoverageDateStart, lastCoverageDateEnd)
          : 0,
      },
    ]
    const endDateFields = [
      {
        name: 'endingDate',
        validity: endingDate ? validateDate(endingDate, startingDate) : 0,
      },
      {
        name: 'dateOfAdmissionEnd',
        validity: dateOfAdmissionEnd
          ? validateDate(dateOfAdmissionEnd, dateOfAdmissionStart)
          : 0,
      },
      {
        name: 'lastCoverageDateEnd',
        validity: lastCoverageDateEnd
          ? validateDate(lastCoverageDateEnd, lastCoverageDateStart)
          : 0,
      },
    ]
    startDateFields.forEach((field) => {
      const value = data[field.name as keyof typeof data] as DateValue
      if (field.validity > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: INVALID_RANGE_ERROR,
          path: [field.name],
        })
      } else if (value && value.compare(new CalendarDate(2000, 1, 1)) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field.name],
          message: OUT_OF_RANGE_ERROR,
        })
      }
    })
    endDateFields.forEach((field) => {
      const value = data[field.name as keyof typeof data] as DateValue
      if (field.validity < 0) {
        ctx.addIssue({
          message: INVALID_RANGE_ERROR,
          code: z.ZodIssueCode.custom,
          path: [field.name],
        })
      } else if (value && value.compare(new CalendarDate(2000, 1, 1)) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: OUT_OF_RANGE_ERROR,
          path: [field.name],
        })
      }
    })
  })

type ProviderCodingSchema = z.infer<typeof providerCodingViewSchema>

export { providerCodingViewSchema, type ProviderCodingSchema }
