import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const getFormValue = (
  data: SpravatoWidgetSchemaType,
  field: string,
  defaultValue = '',
) => data[field as keyof SpravatoWidgetSchemaType]?.toString() || defaultValue

const convertToDate = (time: string) => {
  if (!time) return ''
  const [hours, minutes] = time.split(':').map(Number)
  const now = new Date()
  now.setHours(hours, minutes, 0, 0)
  return now
}

export { getFormValue, convertToDate }
