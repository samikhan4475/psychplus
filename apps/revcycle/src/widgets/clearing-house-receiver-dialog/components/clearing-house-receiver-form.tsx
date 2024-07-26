import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { FormContainer } from 'node_modules/@psychplus/ui/src/form'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormSelect, validate } from '@psychplus/form'
import {
  createClearingHouseReceiver,
  updateClearingHouseReceiver,
} from '../api'
import { ClearingHouseReceiver, StateOption } from '../types'
import AddressComponent from './address-fields'
import TextFieldLabel from './text-field'

const schema = z.object({
  id: validate.anyString,
  clearingHouseName: validate.anyString,
  receiverId: validate.anyString,
  receiverName: validate.anyString,
  phone: validate.anyString.optional(),
  fax: validate.anyString.optional(),
  email: validate.anyString.optional(),
  website: validate.anyString.optional(),
  submissionMethod: validate.anyString,
  submissionUrl: validate.anyString,
  submissionPort: validate.numberOnly,
  submissionDirectory: validate.anyString,
  batchResponseDirectory: validate.anyString,
  chResponseDirectory: validate.anyString,
  claimResponseDirectory: validate.anyString,
  eraResponseDirectory: validate.anyString,
  isa01: validate.anyString.optional(),
  isa03: validate.anyString.optional(),
  isa05: validate.anyString.optional(),
  isa07: validate.anyString.optional(),
  isa08: validate.anyString.optional(),
  gs03: validate.anyString.optional(),
  nm140ReceiverName: validate.anyString.optional(),
  nm140ReceiverId: validate.anyString.optional(),
  address1: validate.anyString,
  address2: validate.anyString.optional(),
  city: validate.anyString,
  state: validate.anyString,
  zip: validate.anyString,
})
type SchemaType = z.infer<typeof schema>

const ClearingHouseReceiverForm = ({
  data,
  isEdit = false,
  usStatesCodeSets,
}: {
  isEdit?: boolean
  data?: SchemaType
  usStatesCodeSets?: StateOption[]
}) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id || '',
      clearingHouseName: data?.clearingHouseName || '',
      receiverId: data?.receiverId || '',
      receiverName: data?.receiverName || '',
      phone: data?.phone || '',
      fax: data?.fax || '',
      email: data?.email || '',
      website: data?.website || '',
      submissionMethod: data?.submissionMethod || '',
      submissionUrl: data?.submissionUrl || '',
      submissionPort: data?.submissionPort || '',
      submissionDirectory: data?.submissionDirectory || '',
      batchResponseDirectory: data?.batchResponseDirectory || '',
      chResponseDirectory: data?.chResponseDirectory || '',
      claimResponseDirectory: data?.claimResponseDirectory || '',
      eraResponseDirectory: data?.eraResponseDirectory || '',
      isa01: data?.isa01 || '',
      isa03: data?.isa03 || '',
      isa05: data?.isa05 || '',
      isa07: data?.isa07 || '',
      isa08: data?.isa08 || '',
      gs03: data?.gs03 || '',
      nm140ReceiverName: data?.nm140ReceiverName || '',
      nm140ReceiverId: data?.nm140ReceiverId || '',
      address1: data?.address1 || '',
      address2: data?.address2 || '',
      city: data?.city || '',
      state: data?.state || '',
      zip: data?.zip || '',
      recordStatus: data?.isa01 || '',
    } as SchemaType,
  })

  const onSubmit: SubmitHandler<SchemaType> = async (formData: {
    [key: string]: any
  }) => {
    delete formData.id
    let response
    if (isEdit && data && data.id) {
      response = await updateClearingHouseReceiver(
        {
          ...formData,
        } as ClearingHouseReceiver,
        data?.id,
      )
    } else {
      response = await createClearingHouseReceiver({
        ...formData,
      } as ClearingHouseReceiver)
    }
    if (response) {
      window.location.reload()
    } else {
      alert(response)
    }
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="4" gap="4" className="col-span-1">
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.clearingHouseName?.message}
            type="text"
            label="Clearinghouse Name"
            disabled={!isEdit}
            register={form.register('clearingHouseName')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.receiverName?.message}
            type="text"
            label="Receiver Name"
            disabled={!isEdit}
            register={form.register('receiverName')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.receiverId?.message}
            type="text"
            label="Receiver ID"
            disabled={!isEdit}
            register={form.register('receiverId')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.phone?.message}
            type="text"
            label="Phone"
            disabled={!isEdit}
            register={form.register('phone')}
          />
        </Box>
      </Grid>

      <Grid columns="4" gap="4" className="col-span-1">
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.fax?.message}
            type="text"
            label="Fax"
            disabled={!isEdit}
            register={form.register('fax')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.email?.message}
            type="text"
            label="Email"
            disabled={!isEdit}
            register={form.register('email')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.website?.message}
            type="text"
            label="Website"
            disabled={!isEdit}
            register={form.register('website')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <FormSelect
            label="Submission Method"
            size="2"
            placeholder=""
            options={[{ value: 'sftp', label: 'SFTP' }]}
            {...form.register('submissionMethod')}
            required={true}
          />
        </Box>
      </Grid>

      <Grid columns="3" gap="4" className="col-span-1">
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.submissionUrl?.message}
            type="text"
            label="Submission URL"
            disabled={!isEdit}
            register={form.register('submissionUrl')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.submissionPort?.message}
            type="text"
            label="Submission Port"
            disabled={!isEdit}
            register={form.register('submissionPort')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.submissionDirectory?.message}
            type="text"
            label="Submission Directory"
            disabled={!isEdit}
            register={form.register('submissionDirectory')}
            required={true}
          />
        </Box>
      </Grid>

      <Grid columns="4" gap="4" className="col-span-1">
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.batchResponseDirectory?.message}
            type="text"
            label="Batch Response Directory"
            disabled={!isEdit}
            register={form.register('batchResponseDirectory')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.chResponseDirectory?.message}
            type="text"
            label="CH. Response Directory"
            disabled={!isEdit}
            register={form.register('chResponseDirectory')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.claimResponseDirectory?.message}
            type="text"
            label="Claim Response Directory"
            disabled={!isEdit}
            register={form.register('claimResponseDirectory')}
            required={true}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.eraResponseDirectory?.message}
            type="text"
            label="ERA Response Directory"
            disabled={!isEdit}
            register={form.register('eraResponseDirectory')}
            required={true}
          />
        </Box>
      </Grid>

      <Grid columns="1" className="col-span-1">
        Receiver 837
      </Grid>

      <Grid columns="6" gap="4" className="col-span-1">
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.isa01?.message}
            type="text"
            label="ISA_01"
            disabled={!isEdit}
            register={form.register('isa01')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.isa03?.message}
            type="text"
            label="ISA_03"
            disabled={!isEdit}
            register={form.register('isa03')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.isa05?.message}
            type="text"
            label="ISA_05"
            disabled={!isEdit}
            register={form.register('isa05')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.isa07?.message}
            type="text"
            label="ISA_07"
            disabled={!isEdit}
            register={form.register('isa07')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.isa08?.message}
            type="text"
            label="ISA_08"
            disabled={!isEdit}
            register={form.register('isa08')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.gs03?.message}
            type="text"
            label="GS_03"
            disabled={!isEdit}
            register={form.register('gs03')}
          />
        </Box>
      </Grid>

      <Grid columns="4" gap="4" className="col-span-1">
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.nm140ReceiverName?.message}
            type="text"
            label="NM1_40_ReceiverName"
            disabled={!isEdit}
            register={form.register('nm140ReceiverName')}
          />
        </Box>
        <Box className="col-span-1 flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.nm140ReceiverId?.message}
            type="text"
            label="NM1_40_ReceiverId"
            disabled={!isEdit}
            register={form.register('nm140ReceiverId')}
          />
        </Box>
      </Grid>

      <AddressComponent
        form={form}
        isEdit={!isEdit}
        title="Primary Address"
        usStatesCodeSets={usStatesCodeSets}
      />

      <Flex gap="3" justify="end" mt="3">
        <button
          type="submit"
          className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
        >
          Save
        </button>
      </Flex>
    </FormContainer>
  )
}

export { ClearingHouseReceiverForm, type SchemaType }
