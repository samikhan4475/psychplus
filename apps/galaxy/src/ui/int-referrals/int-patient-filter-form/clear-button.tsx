'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { getInitialValues } from '../utils'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()

  const store = useStore()
  const { fetchPatientReferrals } = zustandUseStore(store, (state) => ({
    fetchPatientReferrals: state.fetchPatientReferrals,
  }))

  const handleResetForm = () => {
    const initialValues = getInitialValues()
    fetchPatientReferrals(
      sanitizeFormData({
        ...initialValues,
        fromReferralDate: initialValues.fromReferralDate ? initialValues.fromReferralDate.toString() : undefined,
        toReferralDate: initialValues.toReferralDate ? initialValues.toReferralDate.toString() : undefined,
      }),
      1,
      true
    )
    form.reset({ ...getInitialValues() })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black disabled:text-gray-5"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
