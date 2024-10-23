import { z } from 'zod'

const formSchema = z.object({
  locationId: z.string().nonempty('Location ID is required')
    .min(3, 'Location ID must be at least 3 characters long')
    .max(10, 'Location ID must be at most 10 characters long'),
  locationType: z.string().nonempty('Location Type is required')
    .min(3, 'Location Type must be at least 3 characters long')
    .max(20, 'Location Type must be at most 20 characters long'),
  locationName: z.string().nonempty('Location Name is required')
    .min(3, 'Location Name must be at least 3 characters long')
    .max(50, 'Location Name must be at most 50 characters long'),
  locationState: z.string().nonempty('Location State is required')
    .length(2, 'Location State must be exactly 2 characters long'),
  locationZip: z.string().nonempty('Location Zip is required')
    .min(5, 'Location Zip must be at least 5 characters long')
    .max(10, 'Location Zip must be at most 10 characters long'),
  locationNpi: z.string().nonempty('Location NPI is required')
    .length(10, 'Location NPI must be exactly 10 characters long'),
  locationPhone: z.string().nonempty('Location Phone is required')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits'),
  locationStatus: z.string().nonempty('Location Status is required'),
})

type FormSchemaType = z.infer<typeof formSchema>
export { formSchema, type FormSchemaType }