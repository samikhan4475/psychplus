'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, FormSubmitButton } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'
import {
  createImmunizationAction,
  updateImmunizationAction,
} from '../../actions'
import {
  CvxCodes,
  ImmunizationDataResponse,
  ImmunizationTypeEnum,
} from '../../types'
import { transformImmunizationData } from '../utils'
import {
  useAdministeredForm,
  useHistoricalForm,
  useRefusalForm,
} from './immunization-form-hooks'
import { ImmunizationSearchDropdown } from './immunization-search-dropdown'
import RenderImmunizationFields from './render-immunization-fields'
import {
  AdministeredSchemaType,
  HistoricalSchemaType,
  RefusalSchemaType,
} from './schema'

interface GenericImmunizationFormProps {
  initialValues:
    | AdministeredSchemaType
    | HistoricalSchemaType
    | RefusalSchemaType
  isEdit?: boolean
  data?: ImmunizationDataResponse
  closeDialog: () => void
  appointmentId: string
  entryType: keyof typeof ImmunizationTypeEnum
}

const GenericImmunizationForm = ({
  initialValues,
  data,
  closeDialog,
  appointmentId,
  entryType,
}: GenericImmunizationFormProps) => {
  const administeredForm = useAdministeredForm(
    initialValues as AdministeredSchemaType,
  )
  const historicalForm = useHistoricalForm(
    initialValues as HistoricalSchemaType,
  )
  const refusalForm = useRefusalForm(initialValues as RefusalSchemaType)
  const isEdit = Boolean(data?.id)
  const formMap = {
    Administered: administeredForm,
    Historical: historicalForm,
    Refusal: refusalForm,
  }
  const form = formMap[entryType] as UseFormReturn<
    AdministeredSchemaType | HistoricalSchemaType | RefusalSchemaType
  >
  const mvxCodes = useCodesetCodes(CODESETS.MVXCODE)
  const cvxCodes = useCodesetCodes(CODESETS.CVX)

  const cvxCode = form.watch('cvxCode')
  const mvxCode = form.watch('mvxCode')
  useEffect(() => {
    if (!form.getValues('cvxDescription') && cvxCode) {
      const cvxDescription = getCodesetDisplayName(cvxCode, cvxCodes)
      form.setValue('cvxDescription', cvxDescription)
    }

    if (!form.getValues('mvxDescription') && mvxCode) {
      const mvxDescription = getCodesetDisplayName(mvxCode, mvxCodes)
      form.setValue('mvxDescription', mvxDescription)
      form.setValue('manufactureDescription', mvxDescription)
    }
  }, [cvxCode, mvxCode, form, cvxCodes, mvxCodes])

  const handleSubmit = async (
    formData: AdministeredSchemaType | HistoricalSchemaType | RefusalSchemaType,
  ) => {
    const payload = transformImmunizationData(
      formData,
      appointmentId,
      isEdit,
      data?.id,
    )

    const saveImmunization = payload?.id
      ? updateImmunizationAction
      : createImmunizationAction

    const result = await saveImmunization({
      appointmentId: appointmentId!,
      payload,
    })

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to save')
      return
    }

    toast.success(`${isEdit ? 'Updated' : 'Created'} successfully`)
    closeDialog()
  }

  const handleSelect = (item?: CvxCodes) => {
    if (!item) return form.reset()

    const { cvxCode, mvxCode, ndcCode } = item
    const cvxDesc = getCodesetDisplayName(cvxCode || '', cvxCodes)
    const mvxDesc = getCodesetDisplayName(mvxCode || '', mvxCodes)

    form.reset({
      ...form.getValues(),
      cvxCode,
      mvxCode,
      ndcCode,
      cvxDescription: cvxDesc,
      mvxDescription: mvxDesc,
      manufactureDescription: mvxDesc,
    })
  }

  const clearFormValue = () => {
    form.reset({
      ...form.getValues(),
      cvxCode: '',
      mvxCode: '',
      ndcCode: '',
      cvxDescription: '',
      mvxDescription: '',
      manufactureDescription: '',
    })
  }

  return (
    <FormContainer form={form} onSubmit={handleSubmit}>
      <ImmunizationSearchDropdown
        setFormValue={handleSelect}
        clearFormValue={clearFormValue}
      />
      <RenderImmunizationFields entryType={entryType} />
      <Box className="mt-9 flex justify-end">
        <FormSubmitButton
          form={form}
          className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
        >
          {isEdit ? 'Update' : 'Save'}
        </FormSubmitButton>
      </Box>
    </FormContainer>
  )
}

export { GenericImmunizationForm }
