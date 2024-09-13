import z from 'zod'

const patientDataSchema = z.object({
  cmdId: z.string().optional(),
  medicalRecordNumber: z.string().optional(),
  socialSecurityNumber: z.string().optional(),
  status: z.string().optional(),
  driversLicense: z
    .object({
      type: z.string().optional().default('DriversLicense'),
      number: z.string(),
      state: z.string().optional(),
      hasFrontImage: z.boolean(),
      hasBackImage: z.boolean().optional(),
    })
    .optional(),
})

type PatientDataSchema = z.infer<typeof patientDataSchema>

export { patientDataSchema, type PatientDataSchema }
