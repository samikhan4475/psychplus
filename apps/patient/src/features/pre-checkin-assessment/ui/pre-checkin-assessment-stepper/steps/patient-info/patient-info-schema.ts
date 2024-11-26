import z from "zod"

type patientSchemaType = z.infer<typeof patientSchema>

const patientSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  middleName: z.string().min(1, 'Required'),
  dateOfBirth: z.string().min(1, 'Required'),
  phoneNumber: z.string().min(1, 'Required'),
  guardianFirstName: z.string().min(1, 'Required'),
  guardianLastName: z.string().min(1, 'Required'),
  gender: z.string().optional(),
  zipCode: z.string().optional(),

  guadianFirstName: z.string().min(1, 'Required'),
  guadianLastName: z.string().min(1, 'Required'),
  hasGuardian: z.coerce.boolean(),
})

export { patientSchema, type patientSchemaType }