import { DateValue } from 'react-aria-components'
import z from 'zod'
import { INVALID_RANGE_ERROR } from '../constants'
import { validateDate } from '../utils'

const providerCodingViewSchema = z
  .object({
    startingDate: z.custom<DateValue>().optional(),
    endingDate: z.custom<DateValue>().optional(),
    name: z.string().optional(),
    age: z.coerce.number().optional(),
    gender: z.string().optional(),
    dateOfBirth: z.custom<DateValue>().optional(),
    locationId: z.string().optional(),
    serviceIds: z
      .array(z.string())
      .refine((value) => value.every((item) => typeof item === 'string'), {
        message: 'Array must be empty or contain only strings',
      }),
    providerType: z.string().optional(),
    unitId: z.string().optional(),
    roomId: z.string().optional(),
    groupId: z.string().optional(),
    primaryInsuranceName: z.string().optional(),
    secondaryInsuranceName: z.string().optional(),
    visitType: z.string().optional(),
    visitSequence: z.string().optional(),
    visitMedium: z.string().optional(),
    appointmentStatus: z.string().optional(),
    patientInsuranceVerificationStatus: z.string().optional(),
    diagnosisCode: z.string().optional(),
    cptCode: z.string().optional(),
    dateOfAdmissionStart: z.custom<DateValue>().optional(),
    dateOfAdmissionEnd: z.custom<DateValue>().optional(),
    lengthOfStayMin: z.coerce.number().optional(),
    lengthOfStayMax: z.coerce.number().optional(),
    lastCoverageDateStart: z.custom<DateValue>().optional(),
    lastCoverageDateEnd: z.custom<DateValue>().optional(),
    legalStatus: z.string().optional(),
    copayDueMin: z.coerce.number().optional(),
    copayDueMax: z.coerce.number().optional(),
    coInsuranceDueMin: z.coerce.number().optional(),
    coInsuranceDueMax: z.coerce.number().optional(),
    balanceDueMin: z.coerce.number().optional(),
    balanceDueMax: z.coerce.number().optional(),
    noteSignedStatus: z.string().optional(),
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
      if (field.validity > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: INVALID_RANGE_ERROR,
          path: [field.name],
        })
      }
    })
    endDateFields.forEach((field) => {
      if (field.validity < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: INVALID_RANGE_ERROR,
          path: [field.name],
        })
      }
    })
  })

type ProviderCodingSchema = z.infer<typeof providerCodingViewSchema>

export { providerCodingViewSchema, type ProviderCodingSchema }
