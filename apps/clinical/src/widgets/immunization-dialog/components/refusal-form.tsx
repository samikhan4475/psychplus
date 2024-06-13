import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import { Box, Grid } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import {
  CvxCodes,
  DATE_FORMAT,
  findName,
  findOptions,
  Immunization,
  RealCodesets,
} from '@psychplus/immunization'
import {
  createImmunization,
  UpdateImmunization,
} from '@psychplus/immunization/api.client'
import { FormContainer } from '@psychplus/ui/form'
import { useToast } from '@psychplus/ui/toast-provider'
import { useStore } from '@/widgets/immunization-list/store'
import { ImmunizationSearchDropdown } from './immunization-search-dropdown'

const schema = z.object({
  cvxCode: validate.requiredString,
  mvxCode: validate.requiredString,
  cvxDescription: validate.anyString,
  mvxDescription: validate.nullableString,
  datetimeAdministered: validate.anyString,
  reasonCode: validate.nullableString,
})
type SchemaType = z.infer<typeof schema>

const RefusalForm = ({
  data,
  isEdit = false,
  closeDialog,
}: {
  isProfileScreen?: boolean
  isEdit?: boolean
  data?: Immunization
  closeDialog: () => void
}) => {
  const { realCodeSets, appointmentId, immunizations, setImmunizations } =
    useStore()

  const { toast } = useToast()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      cvxCode: data?.cvxCode || '',
      mvxCode: data?.mvxCode || '',
      cvxDescription:
        findName(RealCodesets.CVX, realCodeSets?.[0], data?.cvxCode) || '',
      mvxDescription:
        findName(RealCodesets.MVX, realCodeSets?.[0], data?.mvxCode) || '',
      datetimeAdministered: data?.datetimeAdministered
        ? format(new Date(data?.datetimeAdministered), DATE_FORMAT)
        : format(new Date(), DATE_FORMAT),
      reasonCode: data?.reasonCode || '',
    },
  })

  const setFormValue = (value?: CvxCodes) => {
    form.setValue('cvxCode', value?.cvxCode || '')
    form.setValue(
      'cvxDescription',
      findName(RealCodesets.CVX, realCodeSets?.[0], value?.cvxCode) || '',
    )
    form.setValue('mvxCode', value?.mvxCode || '')
    form.setValue(
      'mvxDescription',
      findName(RealCodesets.MVX, realCodeSets?.[0], value?.mvxCode) || '',
    )
  }

  const clearFormValue = () => {
    form.resetField('cvxCode')
    form.resetField('cvxDescription')
    form.resetField('mvxCode')
    form.resetField('mvxDescription')
  }

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    const formData = form.getValues()

    const formattedDateExp = formData?.datetimeAdministered
      ? new Date(formData?.datetimeAdministered).toISOString()
      : ''

    const payload = {
      ...formData,
      appointmentId: appointmentId,
      entryType: 'Refusal',
      datetimeAdministered: formattedDateExp,
      id: isEdit ? data?.id : undefined,
    }

    const api_url = isEdit ? UpdateImmunization : createImmunization

    try {
      const res = await api_url({ payload, appointmentId })

      const updatedImmunizations: Immunization[] = immunizations.map(
        (immunization) => {
          return immunization.id === data?.id ? res : immunization
        },
      )

      isEdit
        ? setImmunizations(updatedImmunizations)
        : setImmunizations([...immunizations, res])

      toast({ type: 'success', title: isEdit ? 'Updated' : 'Created' })
      closeDialog()
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        console.error('An unknown error occurred:', err)
      }
    }
  }

  return (
    <Toast.Provider>
      <ImmunizationSearchDropdown
        setFormValue={setFormValue}
        clearFormValue={clearFormValue}
      />
      <FormContainer onSubmit={onSubmit} form={form}>
        <Grid
          columns="2"
          gap="4"
          display="inline-grid"
          mt="2"
          className="font-light"
        >
          <FormTextInput label={'CVX Code'} {...form.register('cvxCode')} />
          <FormTextInput
            label={'CVX Description'}
            {...form.register('cvxDescription')}
          />
          <FormTextInput label={'MVX Code'} {...form.register('mvxCode')} />
          <FormTextInput
            label={'MVX Description'}
            {...form.register('mvxDescription')}
          />
          <FormSelect
            label="Refusal Reason"
            placeholder="Select"
            {...form.register('reasonCode')}
            options={findOptions(RealCodesets.REFUSALREASON, realCodeSets?.[0])}
          />
          <FormTextInput
            type="date"
            max="9999-12-31"
            label="Date Time Administered"
            value={
              form.watch('datetimeAdministered') ??
              format(new Date(), DATE_FORMAT)
            }
            {...form.register('datetimeAdministered')}
            style={{ marginRight: 12 }}
            className=" w-full"
          />
        </Grid>
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { RefusalForm }
