import React, { useEffect, useMemo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { UserType } from '../../types'
import { SchemaType } from './schema'

const CredentialsSelect = () => {
  const honorCodes = useCodesetCodes(CODESETS.PractitionerHonor)
  const form = useFormContext<SchemaType>()

  const userActorCategory = form.watch('userActorCategory')
  const specialtyCodes = form.watch('specialtyCodes')

  const codesetOptions = useMemo(() => {
    if (userActorCategory !== UserType.PROVIDER) return []
    if (!specialtyCodes) return honorCodes.map(({ display, value }) => ({ label: display, value }))

    const searchText = specialtyCodes.toLowerCase()
    const filtered = honorCodes.filter(({ attributes = [] }) =>
      attributes.length > 0 && attributes.some(attr => {
        const attrValue = attr.value.toLowerCase()
        const attrName = attr.name?.toLowerCase() || ''

        const searchTerms = [searchText]
        if (searchText === 'therapy') searchTerms.push('therapist') 
        return searchTerms.some(term => 
          attrValue.includes(term) ||
          attrName.includes(term) ||
          attrValue.split('|').some(part => part.toLowerCase().includes(term))
        )
      })
    )

    return filtered.map(({ display, value }) => ({ label: display, value }))
  }, [honorCodes, specialtyCodes, userActorCategory])

  useEffect(() => {
    form.setValue('legalName.honors', '')
  }, [specialtyCodes])

  return (
    <FormFieldContainer>
      <FormFieldLabel required={userActorCategory === UserType.PROVIDER}>
        Credentials
      </FormFieldLabel>

      <SelectInput
        field="legalName.honors"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        options={codesetOptions}
        disabled={userActorCategory !== UserType.PROVIDER || !specialtyCodes}
      />
      <FormFieldError name="legalName.honors" />
    </FormFieldContainer>
  )
}
export { CredentialsSelect }
