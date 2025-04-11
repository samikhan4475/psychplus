import { DateValue } from 'react-aria-components'
import { z } from 'zod'
import { Address } from '../staff-management/types'

const requiredString = z
  .string()
  .min(1, 'Required')
  .max(128, { message: 'Cannot exceed 128 characters' })

const requiredName = z
  .string()
  .min(1, 'Required')
  .max(35, { message: 'Cannot exceed 35 characters' })

const optionalString = z
  .string()
  .max(128, { message: 'Cannot exceed 128 characters' })
  .optional()
const addressSchema = z.object({
  type: z.string(),
  street1: optionalString,
  street2: optionalString,
  city: optionalString,
  state: optionalString,
  country: optionalString,
  postalCode: optionalString,
  geoCoordinates: z
    .object({
      longitude: z.number(),
      latitude: z.number(),
      altitude: z.number(),
    })
    .optional(),
  timeZoneId: optionalString,
})

const validateAddressFields = (
  address: Address,
  pathPrefix: string,
  ctx: z.RefinementCtx,
) => {
  const fields = ['street1', 'city', 'state', 'postalCode']
  fields.forEach((field) => {
    const fieldValue = address[field as keyof Address]
    if (typeof fieldValue !== 'string' || fieldValue.trim().length < 1) {
      ctx.addIssue({
        path: [`addresses.${pathPrefix}.${field}`],
        message: 'Required',
        code: z.ZodIssueCode.custom,
      })
    }
  })
}

const schema = z
  .object({
    staffId: requiredString,
    userId: requiredString,
    staffRoleId: optionalString,
    status: requiredString,
    staffUserRoleIds: z.array(requiredString),
    firstName: requiredName,
    lastName: requiredName,
    dob: z.custom<DateValue | null>().refine((value) => value !== undefined, {
      message: 'Required',
    }),
    middleName: optionalString,
    spokenLanguages: z
      .array(requiredString)
      .min(1, { message: 'Minimum 1 is required' }),
    virtualRoomLink: optionalString,
    biography: optionalString,
    title: requiredString,
    address: optionalString,
    address2: optionalString,
    country: optionalString,
    stateCode: optionalString,
    city: optionalString,
    postalCode: optionalString,
    secondaryAddress: optionalString,
    secondaryAddress2: optionalString,
    secondaryCountry: optionalString,
    secondaryStateCode: optionalString,
    secondaryCity: optionalString,
    secondaryPostalCode: optionalString,
    npi: z.string().min(10, { message: 'NPI must be 10 characters' }),
    gender: requiredString,
    email: requiredString.email(),
    addresses: z.array(addressSchema),
    phoneContact: requiredString,
    supervisedBy: optionalString,
    supervisorStaffId: z.string(),
    specialists: z.array(requiredString),
    providerAttributions: z.array(z.string()).optional(),
    organizationIds: z.array(requiredString),
    practiceIds: z.array(requiredString),
    isMailingAddressSameAsPrimary: z.boolean(),
    timeZonePreference: requiredString,
    hasBioVideo: z.boolean(),
    staffTypeIds: z.array(requiredString),
  })
  .superRefine((data, ctx) => {
    const { addresses, isMailingAddressSameAsPrimary } = data

    validateAddressFields(addresses[0], '0', ctx)
    if (!isMailingAddressSameAsPrimary)
      validateAddressFields(addresses[1], '1', ctx)
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
