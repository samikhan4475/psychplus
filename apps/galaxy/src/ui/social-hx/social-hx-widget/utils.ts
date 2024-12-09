import { SocialHxWidgetSchemaType } from './social-hx-widget-schema'

const getInitialValues = (): SocialHxWidgetSchemaType => ({
  relationshipStatus: undefined,
  professionalEducation: undefined,
  employed: undefined,
  legalHistory: undefined,
  living: undefined,
  traumaHx: undefined,
  other: undefined,
})

export { getInitialValues }
