import z from 'zod'

const HospitalWidgetSchema = z.object({
  HospitalLabsOrders: z.string(),
})
type HospitalWidgetSchemaType = z.infer<typeof HospitalWidgetSchema>

export { HospitalWidgetSchema, type HospitalWidgetSchemaType }
