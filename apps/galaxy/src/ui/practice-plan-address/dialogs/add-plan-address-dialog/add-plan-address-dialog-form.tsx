import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  AddressFieldsGroup,
  CheckboxInput,
  FormContainer,
  FormFieldContainer,
  PropsWithRow,
} from '@/components'
import { sanitizeFormData } from '@/utils'
import {
  addPracticePlanAddressAction,
  updatePracticePlanAddressAction,
} from '../../actions'
import { PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE } from '../../constants'
import { useStore } from '../../store'
import { PracticePlanAddress } from '../../types'
import { schema, SchemaType } from './schema'

interface AddPlanAddressDialogFormProps
  extends Partial<PropsWithRow<PracticePlanAddress>> {
  onToggle: (value: boolean) => void
}

const AddPlanAddressDialogForm = ({
  row,
  onToggle,
}: AddPlanAddressDialogFormProps) => {
  const original = row?.original
  const { id: practicePlanId } = useParams<{ id: string }>()
  const search = useStore((state) => state.search)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: original?.id,
      recordStatus: original?.recordStatus ?? 'Active',
      address: {
        type: original?.address.type ?? 'Home',
        street1: original?.address.street1 ?? '',
        street2: original?.address.street2 ?? '',
        city: original?.address.city ?? '',
        state: original?.address.state ?? '',
        country: original?.address.country ?? '',
        postalCode: original?.address.postalCode ?? '',
        postalPlus4Code: original?.address.postalPlus4Code ?? '',
        timeZoneId: original?.address.timeZoneId ?? '',
      },
      cityId: original?.cityId ?? '',
      stateId: original?.stateId ?? '',
      isDefaultLocation: original?.isDefaultLocation ?? false,
    },
  })

  const onSave = async (formData: SchemaType) => {
    const sanitizedPayload = sanitizeFormData({
      ...formData,
      recordStatus: formData.recordStatus,
    })
    const isUpdateCase = !!original?.address?.street1
    const planAddressAction = isUpdateCase
      ? updatePracticePlanAddressAction
      : addPracticePlanAddressAction

    const result = await planAddressAction(sanitizedPayload, practicePlanId)
    if (result.state === 'error')
      return toast.error(
        result.error ??
          `Failed to ${isUpdateCase ? 'update' : 'add'} practice plan address`,
      )
    toast.success(
      `Plan Address ${isUpdateCase ? 'updated' : 'added'} successfully`,
    )
    onToggle(false)
    search({ practicePlanId }, 1, PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE, true)
  }

  useEffect(() => {
    if (row?.original?.address?.street1) form.setFocus('address.street2')
  }, [])
  return (
    <FormContainer onSubmit={onSave} form={form}>
      <AddressFieldsGroup
        addAreaCode={false}
        columnsPerRow="1"
        addressFieldName="street1"
        prefix="address"
      />
      <Flex gapX="2" mt="2">
        <Flex align="center" gap="2">
          <CheckboxInput
            size="1"
            field="recordStatus"
            onCheckedChange={(checked: boolean) => {
              form.setValue('recordStatus', checked ? 'Active' : 'Inactive')
            }}
            checked={form.watch('recordStatus') === 'Active'}
          />
          <Text size="1" className="cursor-default" weight="medium">
            Mark as Active
          </Text>
        </Flex>
        <Flex align="center" gap="2">
          <CheckboxInput
            size="1"
            field="isDefaultLocation"
            checked={form.watch('isDefaultLocation')}
          />
          <Text size="1" className="cursor-default" weight="medium">
            Default Address
          </Text>
        </Flex>
      </Flex>
      <FormFieldContainer className="flex-1 gap-0">
        <Box className="mt-4 flex justify-end">
          <Button
            loading={form.formState.isSubmitting}
            className="bg-pp-black-2 text-white"
          >
            <Text size="2">Save</Text>
          </Button>
        </Box>
      </FormFieldContainer>
    </FormContainer>
  )
}

export { AddPlanAddressDialogForm }
