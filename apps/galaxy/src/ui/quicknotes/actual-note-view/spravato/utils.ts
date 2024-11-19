import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const getFormValue = (
  data: SpravatoWidgetSchemaType,
  field: string,
  defaultValue = '',
) => data[field as keyof SpravatoWidgetSchemaType]?.toString() || defaultValue

export { getFormValue }
