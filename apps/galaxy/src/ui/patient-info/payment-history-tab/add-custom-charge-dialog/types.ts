import { CustomChargeSchemaType } from './schema'

interface CustomChargePayload
  extends Omit<CustomChargeSchemaType, 'chargeDate'> {
  chargeDate: string
}

export type { CustomChargePayload }
