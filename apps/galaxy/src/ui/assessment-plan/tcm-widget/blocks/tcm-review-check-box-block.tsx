import React from 'react'
import { Flex } from '@radix-ui/themes'
import { CheckboxInput, FormFieldError } from '@/components'
import { CHECK_BOX_RESULT } from '../constants'

const TcmReviewCheckBox = () => {
  return (
    <Flex gap="2">
      <CheckboxInput
        label={CHECK_BOX_RESULT}
        field={'tcmResultCheckBox'}
        labelClassName="max-w-max"
        required
        disabled
        defaultChecked
      />
      <FormFieldError name="tcmResultCheckBox" />
    </Flex>
  )
}

export { TcmReviewCheckBox }
