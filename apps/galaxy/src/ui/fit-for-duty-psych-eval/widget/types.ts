import { DateValue } from 'react-aria-components'
import { Gender, QuickNoteSectionItem } from '@/types'
import { PatientVital } from '@/ui/vitals'

interface BlockProps {
  disabled?: boolean
  heading?: string
}
type TemplateValues = Record<
  string,
  string | number | DateValue | undefined | null
> & {
  gender: Gender
}
interface FieldBlock {
  field: string
  heading: string
  options?: { label: string; value: string }[]
  maxLength?: number
  conditionalOn?: {
    field: string
    value: string
  }
}
interface TemplateSection {
  key: string
  heading: string
  template: string
}
interface ReferralFields {
  referringOrganization: string
  referringOrganizationOtherDetails?: string
  intervieweeRole: string
  intervieweeRoleOtherDetails?: string
}
type SupportsVitals = {
  patientWeight?: string
  heightFeet?: string
  heightInches?: string
}

interface TransformInParams {
  data: QuickNoteSectionItem[]
  patientVitals?: PatientVital
  isActualNoteView?: boolean
}

interface IsAllowedArgs {
  value: string
  floatValue?: number
}
interface RangeRule {
  min: number
  max: number
  decimals: number
  allowEmpty?: boolean
  allowTrailingDot?: boolean
}
export type {
  BlockProps,
  TemplateValues,
  FieldBlock,
  ReferralFields,
  TemplateSection,
  SupportsVitals,
  TransformInParams,
  IsAllowedArgs,
  RangeRule,
}
