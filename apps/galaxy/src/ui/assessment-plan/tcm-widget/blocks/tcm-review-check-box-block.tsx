
import { CheckboxInput, FormFieldError } from '@/components'
import React from 'react'
import { CHECK_BOX_RESULT } from '../constants'
import { Flex } from '@radix-ui/themes'

const TcmReviewCheckBox = () => {
    return (
        <Flex gap="2">
            <CheckboxInput
                label={CHECK_BOX_RESULT}
                field={'tcmResultCheckBox'}
                labelClassName="max-w-max"
                required
                defaultChecked
               />
            <FormFieldError name='tcmResultCheckBox' />
        </Flex>
    )
}

export { TcmReviewCheckBox }
