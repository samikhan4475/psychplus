'use client'

import { BlockHeading } from '../../block-heading'
import { DetailsField, RadioFieldWithError } from '../../components'
import { HIGH_SCHOOL_PERFORMANCE_OPTIONS } from '../../constant'
import { BlockProps } from '../../types'

const Education = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Education">
      <RadioFieldWithError
        field="highSchoolPerformance"
        label="Patient’s performance in high school was:"
        options={HIGH_SCHOOL_PERFORMANCE_OPTIONS}
        disabled={disabled}
        required
      />

      <DetailsField
        label="Describe the next steps patient did following high school in terms of education"
        maxLength={1200}
        className="min-h-11"
        field="postHighSchoolEducation"
        disabled={disabled}
      />
    </BlockHeading>
  )
}
export { Education }
