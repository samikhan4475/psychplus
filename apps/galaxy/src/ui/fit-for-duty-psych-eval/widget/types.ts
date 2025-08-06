import { DateValue } from 'react-aria-components'
import { Gender } from '@/types'

interface BlockProps {
  disabled?: boolean
}
type TemplateValues = Record<
  string,
  string | number | DateValue | undefined | null
> & {
  gender: Gender
}
export type { BlockProps, TemplateValues }
