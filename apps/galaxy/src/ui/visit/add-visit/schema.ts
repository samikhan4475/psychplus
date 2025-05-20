import { getLocalTimeZone, today } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import z, { RefinementCtx } from 'zod'
import { VisitSequenceTypes } from '@/types'

const schema = z
  .object({
    patient: z.object({
      id: z.number(),
      firstName: z.string(),
      middleName: z.string().optional(),
      lastName: z.string(),
      birthdate: z.string().optional(),
      gender: z.string().optional(),
      medicalRecordNumber: z.string().optional(),
      status: z.string().optional(),
      state: z.string().optional(),
    }),
    state: z.string().min(1, 'Required'),
    location: z.string().min(1, 'Required'),
    service: z.string().min(1, 'Required'),
    isServiceTimeDependent: z.boolean().default(false),
    providerType: z.string().min(1, 'Required'),
    visitType: z.string().min(1, 'Required'),
    visitSequence: z.string().min(1, 'Required'),
    visitMedium: z.string().min(1, 'Required'),
    paymentResponsibility: z.string().min(1, 'Required'),
    visitDate: z.custom<DateValue>().optional(),
    isPrimaryProviderType: z.boolean(),
    isOverridePermissionProvided: z.boolean(),
    isProceedPermissionProvided: z.boolean(),
    timeZoneId: z.string().optional(),

    // Timed Service
    provider: z.string().optional(),
    groupType: z.string().optional(),
    dcDate: z.custom<DateValue>().optional(),
    dcLocation: z.string().optional(),
    edDischarge: z.string().optional(),
    visitTime: z.string().optional(),
    duration: z.string().optional(),
    frequency: z.string().optional(),
    upto: z.string().optional(),
    showDCFields: z.boolean().optional(),
    showGroupTypeField: z.boolean().optional(),

    // Untimed Service
    visitStatus: z.string().optional(),
    facilityAdmissionId: z.string().optional(),
    dateOfAdmission: z.custom<DateValue>().optional(),
    timeOfAdmission: z.string().optional(),
    admittingProvider: z.string().optional(),
    dischargeDate: z.custom<DateValue>().optional(),
    visitFrequency: z.string().optional(),
    insuranceAuthorizationNumber: z.string().optional(),
    authDate: z.custom<DateValue>().optional(),
    legal: z.string().optional(),
    unit: z.string().optional(),
    room: z.string().optional(),
    group: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const validateTimedService = (
      _data: Partial<SchemaType>,
      _ctx: RefinementCtx,
    ) => {
      const requiredFields = [
        { field: 'providerType', message: 'Required' },
        { field: 'provider', message: 'Required' },
        { field: 'visitDate', message: 'Required' },
        { field: 'visitTime', message: 'Required' },
        { field: 'duration', message: 'Required' },
        { field: 'frequency', message: 'Required' },
      ]
      if (data.showGroupTypeField) {
        requiredFields.push({ field: 'groupType', message: 'Required' })
      }
      if (data.showDCFields) {
        requiredFields.push({ field: 'dcDate', message: 'Required' })
        requiredFields.push({ field: 'dcLocation', message: 'Required' })
        requiredFields.push({ field: 'edDischarge', message: 'Required' })
      }

      requiredFields.forEach(({ field, message }) => {
        if (!_data[field as keyof SchemaType]) {
          _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message,
          })
        }
      })
    }

    const validateUntimedService = (
      _data: Partial<SchemaType>,
      _ctx: RefinementCtx,
    ) => {
      const requiredFields = [
        { field: 'facilityAdmissionId', message: 'Required' },
        { field: 'dateOfAdmission', message: 'Required' },
        { field: 'timeOfAdmission', message: 'Required' },
        { field: 'admittingProvider', message: 'Required' },
        { field: 'visitFrequency', message: 'Required' },
        { field: 'legal', message: 'Required' },
      ]

      requiredFields.forEach(({ field, message }) => {
        if (!_data[field as keyof SchemaType]) {
          _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message,
          })
        }
      })

      if (data.dischargeDate) {
        const isDischargeDateGreaterThanToday =
          data.dischargeDate.compare(today(getLocalTimeZone())) > 0

        const admissionDateOffset = data.dateOfAdmission?.compare(
          today(getLocalTimeZone()),
        )

        const isAdmissionDateGreaterThanToday = admissionDateOffset
          ? admissionDateOffset > 0
          : false

        if (
          isDischargeDateGreaterThanToday &&
          !isAdmissionDateGreaterThanToday
        ) {
          _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['dischargeDate'],
            message: 'Discharge date cannot be greater than today',
          })
        }
      }

      if (data.dischargeDate && data.dateOfAdmission) {
        const isDischargeDateLessThanAdmissionDate =
          data.dischargeDate.compare(data.dateOfAdmission) < 0

        if (isDischargeDateLessThanAdmissionDate) {
          _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['dischargeDate'],
            message: 'Discharge date cannot be less than date of admission',
          })
        }
      }

      if (data.dischargeDate && data.dateOfAdmission && data.visitSequence) {
        const isDischargeDateGreaterThanAdmissionDate =
          data.dischargeDate.compare(data.dateOfAdmission) !== 0

        if (
          data.visitSequence === VisitSequenceTypes.InitialDischarge &&
          isDischargeDateGreaterThanAdmissionDate
        ) {
          _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['dischargeDate'],
            message: 'Discharge date cannot be greater than date of admission',
          })
        }
      }
    }

    if (data.isServiceTimeDependent) {
      validateTimedService(data, ctx)
    } else {
      validateUntimedService(data, ctx)
    }
    if (
      data.showDCFields &&
      data.dcDate &&
      data.visitDate &&
      data.dcDate?.compare(data.visitDate) >= 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['visitDate'],
        message: 'visit date must be greater than dc date',
      })
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
