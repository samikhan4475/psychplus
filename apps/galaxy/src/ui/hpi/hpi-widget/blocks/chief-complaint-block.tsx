import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  DetailsType,
  GroupSelectOption,
  GroupSelectSection,
} from '@/components'
import { HPIVALIDATIONMESSAGE, requiredFields } from '../utils'

const BLOCK_ID = 'chiefComplaint'

const BLOCK_TITLE = 'Chief Complaint'

const BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'Depression',
    value: 'ccDepression',
    fieldName: 'depression',
  },
  {
    label: 'Anxiety',
    value: 'ccAnxiety',
    fieldName: 'anxiety',
  },
  {
    label: 'Bipolar/Mania',
    value: 'ccBipolar/Mania',
    fieldName: 'bipolarMania',
  },
  {
    label: 'PTSD',
    value: 'ccPtsd',
    fieldName: 'ptsd',
  },
  {
    label: 'Obsession/OCD',
    value: 'ccObsession',
    fieldName: 'obsession',
  },
  {
    label: 'BPD',
    value: 'ccBpd',
    fieldName: 'bpd',
  },
  {
    label: 'Substance',
    value: 'ccSubstance',
    fieldName: 'substance',
  },
  {
    label: 'ADHD Inattentive',
    value: 'ccAdhdi',
    fieldName: 'adhdInattentive',
  },
  {
    label: 'ADHD Hyperactive',
    value: 'ccAdhdh',
    fieldName: 'adhdHyperactive',
  },
  {
    label: 'Autism',
    value: 'ccAutism',
    fieldName: 'autism',
  },
  {
    label: 'Conduct Disorder',
    value: 'ccConductDisorder',
    fieldName: 'conductDisorder',
  },
  {
    label: 'Dementia',
    value: 'ccDementia',
    fieldName: 'dementia',
  },
  {
    label: 'Schizophrenia',
    value: 'ccSchizophrenia',
    fieldName: 'schizophrenia',
  },
  {
    label: 'Medication SE',
    value: 'ccMedicationSe',
    fieldName: 'medicationSe',
  },

  {
    label: 'Other',
    value: 'ccOther',
    details: {
      type: 'text' as DetailsType,
      field: 'ccOtherDetails',
      maxLength: 500,
    },
  },
]

const ChiefComplaintBlock = () => {
  const form = useFormContext()
  const { errors, isSubmitting } = form.formState
  const watchedFields = form.watch(['hpiOther', ...requiredFields])
  const hasError = errors?.hpiOther || errors?.chiefComplaint

  useEffect(() => {
    const [hpiField, ...remainingFields] = watchedFields

    const totalSymptoms = Object.values(remainingFields ?? [])
      .filter((value) => Array.isArray(value))
      .reduce((sum, arr) => sum + arr?.length, 0)

    const isHpiOtherValid = (hpiField?.length || 0) >= 30
    const isValid = totalSymptoms >= 3 || isHpiOtherValid

    if (!isValid && isSubmitting) {
      toast.error(HPIVALIDATIONMESSAGE)
    }

    if (isValid && Object.keys(form.formState.errors).length > 0) {
      form.clearErrors(['chiefComplaint', 'hpiOther'])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, watchedFields])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && ['chiefComplaint', 'ccOtherDetails'].includes(name)) {
        form.clearErrors('chiefComplaint')
      }
    })

    return () => subscription.unsubscribe()
  }, [form])

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      // hasChild
      chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
    />
  )
}

export { ChiefComplaintBlock }
