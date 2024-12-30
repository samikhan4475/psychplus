import { SocialHxWidgetSchemaType } from './social-hx-widget-schema'

const getInitialValues = (): SocialHxWidgetSchemaType => ({
  widgetContainerCheckboxField: undefined,
  relationshipStatus: undefined,
  professionalEducation: undefined,
  employed: undefined,
  legalHistory: undefined,
  living: undefined,
  traumaHx: undefined,
  other: '',
})

export { getInitialValues }
