import { zipCodeSchema } from '@psychplus-v2/utils'
import z from 'zod'

const street1Schema = z.string().min(1, 'Required')
const street2Schema = z.string().optional()
const streetSchema = z.string().optional()
const streetNumberSchema = z.string().optional()
const citySchema = z.string().min(1, 'Required')
const stateSchema = z.string().min(1, 'Required')
const countrySchema = z.string().min(1, 'Required')

const primaryAddressSchema = z.object({
  primaryStreet1: street1Schema,
  primaryStreet2: street2Schema,
  primaryStreet: streetSchema,
  primaryStreetNumber: streetNumberSchema,
  primaryCity: citySchema,
  primaryState: stateSchema,
  primaryPostalCode: zipCodeSchema,
  primaryCountry: countrySchema,
})

const secondaryAddressSchema = z.object({
  secondaryStreet1: street1Schema,
  secondaryStreet2: street2Schema,
  secondaryStreet: streetSchema,
  secondaryStreetNumber: streetNumberSchema,
  secondaryCity: citySchema,
  secondaryState: stateSchema,
  secondaryPostalCode: zipCodeSchema,
  secondaryCountry: countrySchema,
})

const addressSchema = primaryAddressSchema.and(secondaryAddressSchema)

type AddressSchemaType = z.infer<typeof addressSchema>

export { addressSchema, type AddressSchemaType }
