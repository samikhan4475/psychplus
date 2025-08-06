'use client'

import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import { MEDICAL_BLOCK_CONFIG } from '../../constant'
import { BlockProps } from '../../types'

const Medical = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Medical">
      {MEDICAL_BLOCK_CONFIG.map(({ field, heading, options }) => (
        <RadioFieldWithError
          key={field}
          label={heading}
          field={field}
          options={options}
          disabled={disabled}
          required
        />
      ))}
    </BlockHeading>
  )
}
export { Medical }
