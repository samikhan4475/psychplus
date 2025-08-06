'use client'

import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import { IMPULSE_CONTROL_BLOCK_CONFIG } from '../../constant'
import { BlockProps } from '../../types'

const ImpulseControl = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Impulse Control">
      {IMPULSE_CONTROL_BLOCK_CONFIG.map(({ field, heading, options }) => (
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
export { ImpulseControl }
