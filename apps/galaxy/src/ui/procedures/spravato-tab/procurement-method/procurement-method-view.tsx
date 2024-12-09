import { FormFieldContainer } from '@/components'
import { SectionHeading } from '../sections/section-heading'
import { PrecurementBlock } from './blocks'

const ProcurementMethod = () => {
  return (
    <FormFieldContainer className="bg-white mt-2 p-2.5 shadow-2">
      <SectionHeading title="Procurement Method" />

      <PrecurementBlock />
    </FormFieldContainer>
  )
}

export { ProcurementMethod }
