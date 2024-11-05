import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CategorySelectField = () => {
    return (
        <FormFieldContainer className="w-auto flex-row items-center gap-1">
            <FormFieldLabel>Category</FormFieldLabel>
            <CodesetSelect
                name="category"
                codeset={CODESETS.FeeScheduleCategoryType}
                size="1"
                className="w-[101px]"
            />
        </FormFieldContainer>
    )
}

export { CategorySelectField }
