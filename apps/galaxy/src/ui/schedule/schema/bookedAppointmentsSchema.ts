import { CalendarDate } from '@internationalized/date'
import { DateValue, TimeValue } from 'react-aria-components'
import z from 'zod'
import { INVALID_RANGE_ERROR, OUT_OF_RANGE_ERROR } from '../constants'
import { validateDate } from '../utils'

const dateValidation = z.custom<DateValue>()
const arrayOfIdsValidation = z
  .array(z.string())
  .refine((value) => value.every((item) => typeof item === 'string'), {
    message: 'Array must be empty or contain only strings',
  })

const bookedAppointmentsSchema = z
  .object({
    startingDate: dateValidation.optional(),
    endingDate: dateValidation.optional(),
    name: z.string().optional(),
    age: z.coerce.number().positive('Invalid age').optional(),
    gender: z.string().optional(),
    stateIds: arrayOfIdsValidation,
    bookedAppointmentTime: z.custom<TimeValue>(),
    dateOfBirth: dateValidation.optional(),
    patientStatuses: arrayOfIdsValidation,
    locationIds: arrayOfIdsValidation,
    serviceIds: arrayOfIdsValidation,
    providerTypes: arrayOfIdsValidation,
    providerIds: arrayOfIdsValidation,
    unitIds: arrayOfIdsValidation,
    roomIds: arrayOfIdsValidation,
    groupIds: arrayOfIdsValidation,
    primaryInsuranceNames: arrayOfIdsValidation,
    secondaryInsuranceNames: arrayOfIdsValidation,
    visitTypes: arrayOfIdsValidation,
    visitSequences: arrayOfIdsValidation,
    visitMediums: arrayOfIdsValidation,
    appointmentStatuses: arrayOfIdsValidation,
    patientInsuranceVerificationStatuses: arrayOfIdsValidation,
    diagnosisCode: z.string().optional(),
    insuranceAuthorizationNumber: z.string().optional(),
    cptCode: z.string().optional(),
    dateOfAdmissionStart: dateValidation.optional(),
    dateOfAdmissionEnd: dateValidation.optional(),
    lengthOfStayMin: z.coerce.number().optional(),
    lengthOfStayMax: z.coerce.number().optional(),
    lastCoverageDateStart: dateValidation.optional(),
    lastCoverageDateEnd: dateValidation.optional(),
    legalStatuses: arrayOfIdsValidation,
    copayDueMin: z.coerce.number().optional(),
    copayDueMax: z.coerce.number().optional(),
    copayPaid: z.coerce.number().optional(),
    coInsuranceDueMin: z.coerce.number().optional(),
    coInsuranceDueMax: z.coerce.number().optional(),
    coInsurancePaid: z.coerce.number().optional(),
    balanceDueMin: z.coerce.number().optional(),
    balanceDueMax: z.coerce.number().optional(),
    balancePaid: z.coerce.number().optional(),
    noteSignedStatuses: arrayOfIdsValidation,
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
    const isStartDateValid = startingDate
      ? validateDate(startingDate, endingDate)
      : 0
    const isEndDateValid = endingDate
      ? validateDate(endingDate, startingDate)
      : 0
    const isDateOfAdmissionStartValid = dateOfAdmissionStart
      ? validateDate(dateOfAdmissionStart, dateOfAdmissionEnd)
      : 0
    const isDateOfAdmissionEndValid = dateOfAdmissionEnd
      ? validateDate(dateOfAdmissionEnd, dateOfAdmissionStart)
      : 0
    const isLastCoverageDateStartValid = lastCoverageDateStart
      ? validateDate(lastCoverageDateStart, lastCoverageDateEnd)
      : 0
    const isLastCoverageDateEndValid = lastCoverageDateEnd
      ? validateDate(lastCoverageDateEnd, lastCoverageDateStart)
      : 0
    const startDateFields = [
      {
        name: 'startingDate',
        validity: isStartDateValid,
      },
      {
        name: 'dateOfAdmissionStart',
        validity: isDateOfAdmissionStartValid,
      },
      {
        name: 'lastCoverageDateStart',
        validity: isLastCoverageDateStartValid,
      },
    ]
    const endDateFields = [
      {
        name: 'endingDate',
        validity: isEndDateValid,
      },
      {
        name: 'dateOfAdmissionEnd',
        validity: isDateOfAdmissionEndValid,
      },
      {
        name: 'lastCoverageDateEnd',
        validity: isLastCoverageDateEndValid,
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
          message: OUT_OF_RANGE_ERROR,
          code: z.ZodIssueCode.custom,
          path: [field.name],
        })
      }
    })
    endDateFields.forEach((field) => {
      const value = data[field.name as keyof typeof data] as DateValue
      if (field.validity < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field.name],
          message: INVALID_RANGE_ERROR,
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

type BookedAppointmentsSchemaType = z.infer<typeof bookedAppointmentsSchema>

export { bookedAppointmentsSchema, type BookedAppointmentsSchemaType }
