
import { CheckboxInput } from '@/components'
import React from 'react'
import { CHECK_BOX_RESULT } from '../constants'

const TcmReviewCheckBox = () => {
    return (
        <CheckboxInput
            label={CHECK_BOX_RESULT}
            field={'tcmResult'}
            labelClassName="max-w-max"
            required
            defaultChecked />
    )
}

export { TcmReviewCheckBox }
