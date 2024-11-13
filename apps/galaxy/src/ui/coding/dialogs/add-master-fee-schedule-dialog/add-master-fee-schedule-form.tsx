import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import {
  addMasterFeeScheduleAction,
  updateMasterFeeScheduleAction,
} from '../../actions'
import { useStore } from '../../master-fee-schedule-tab/store'
import { CPT } from '../../types'
import { AddButton } from './add-button'
import { AgeRangeField } from './age-range-field'
import { CategorySelectField } from './category-select-field'
import { ClearButton } from './clear-button'
import { CptCodeField } from './cpt-code-field'
import { DescriptionField } from './description-field'
import { GenderSelectField } from './gender-select-field'
import { MastersField } from './masters-field'
import { MdDoField } from './md-do-field'
import { NpField } from './np-field'
import { PaField } from './pa-field'
import { PosSelectField } from './pos-field'
import { PsyDField } from './psyd-field'
import { RequirementField } from './requirement-field'
import { schema, SchemaType } from './schema'
import { StatusSelectField } from './status-select-field'

interface AddMasterFeeScheduleFormProps {
  onCloseModal: (open: boolean) => void
  cpt?: Partial<CPT>
}

const AddMasterFeeScheduleForm = ({
  onCloseModal,
  cpt,
}: AddMasterFeeScheduleFormProps) => {
  const search = useStore((state) => state.search)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: cpt?.id ?? '',
      minimumAge: cpt?.minimumAge ?? '',
      maximumAge: cpt?.maximumAge ?? '',
      gender: cpt?.gender ?? '',
      category: cpt?.category ?? '',
      placeOfService: cpt?.placeOfService ?? '',
      recordStatus: cpt?.recordStatus ?? '',
      cptCode: cpt?.cptCode ?? '',
      description: cpt?.description ?? '',
      requirement: cpt?.requirement ?? '',
      psyDAmount: cpt?.psyDAmount ?? '',
      mdDoAmount: cpt?.mdDoAmount ?? '',
      npAmount: cpt?.npAmount ?? '',
      paAmount: cpt?.paAmount ?? '',
      mastersAmount: cpt?.mastersAmount ?? '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const sanitizedData = sanitizeFormData(data)

    const masterFeeScheduleAction = cpt?.id
      ? updateMasterFeeScheduleAction
      : addMasterFeeScheduleAction

    await masterFeeScheduleAction(sanitizedData, cpt?.id ?? '').then(
      (result) => {
        if (result.state === 'success') {
          toast.success(
            `CPT record ${cpt?.id ? 'updated' : 'created'} successfully`,
          )
          search()
          onCloseModal(false)
        } else if (result.state === 'error') {
          toast.error(
            result.error ??
              `Failed to ${cpt?.id ? 'update' : 'create'} the record`,
          )
        }
      },
    )
  }

  return (
    <FormContainer className="gap-2" form={form} onSubmit={onSubmit}>
      <Grid columns="3" gapX="2">
        <CptCodeField />
        <PosSelectField />
        <MdDoField />
      </Grid>
      <Grid columns="4" gapX="2">
        <NpField />
        <PaField />
        <PsyDField />
        <MastersField />
      </Grid>
      <Grid columns="2" gapX="2">
        <DescriptionField />
        <RequirementField />
      </Grid>
      <Grid columns="2" gapX="2">
        <CategorySelectField />
        <GenderSelectField />
      </Grid>
      <Grid columns="3" gapX="2">
        <AgeRangeField />
        <StatusSelectField />
        <ClearButton />
      </Grid>
      <AddButton />
    </FormContainer>
  )
}

export { AddMasterFeeScheduleForm, type SchemaType }
