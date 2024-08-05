'use client'
import { addSubmitterRecord, updateSubmitterRecord } from '@/widgets/clearing-house-submitter/api.client';
import { SubmitterFormSchema, submitterFormSchema } from '@/widgets/clearing-house-submitter/schema/submitterForm.schema';
import {
  Form,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
} from '@psychplus/form';
import { Box, Flex } from '@radix-ui/themes';
import { type SubmitHandler } from 'react-hook-form';
import { useStore } from '../../store';
import AddressComponent from '../submitter-address-field/address-fields';
import { SubmitterItem } from '../types';

interface SubmitterAddDialogFormProps {
  refresh: () => void;
  selectedSubmitterItem: SubmitterItem | null
}

const SubmitterAddDialogForm = (props: SubmitterAddDialogFormProps) => {
  const statesList = useStore((state) => state.stateList);
  const practiceList = useStore((state) => state.practiceList);
  const receiversData = useStore((state) => state.receiverList);
  const receiversList = receiversData.map((item) => ({
    id: item.id,
    receiverName: item.receiverName,
    city: item.city,
    state: item.state,
  }));

  const form = useForm({
    schema: submitterFormSchema,
    criteriaMode: 'all',
    defaultValues: props.selectedSubmitterItem || {},
  });

  const onSubmit: SubmitHandler<SubmitterFormSchema> = async (data) => {
    try {
      const receiverName = receiversList.find(r => r.id === data.receiverId)?.receiverName;
      const practiceName = practiceList.find(r => r.id === data.practiceId)?.name;
      const id = data?.id ? data.id : null;
      const recordStatus = "Active";

      const submitData = {
        ...data,
        receiverName,
        practiceName,
        id,
        recordStatus
      };

      if (props.selectedSubmitterItem?.id) {
        await updateSubmitterRecord(props.selectedSubmitterItem.id, submitData);
      } else {
        await addSubmitterRecord(submitData);
      }
      props.refresh();
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" px="1">
        <Flex gap="2" my="1">
          <Box className='flex-1'>
            <FormTextInput
              label="Name"
              required={true}
              {...form.register('name')}
            />
          </Box>
          <Box className='flex-1'>
            <FormTextInput
              label="User Name"
              required={true}
              {...form.register('username')}
            />
          </Box>
          <Box className='flex-1'>
            <FormTextInput
              label="User Password"
              required={true}
              {...form.register('password')}
            />
          </Box>
        </Flex>

        <Flex gap="2" my="1">
          <Box className='flex-1'>
            <FormTextInput
              label="User Email"
              required={true}
              {...form.register('email')}
            />
          </Box>
          <Box className='flex-1'>
            <FormTextInput
              label="Submitter ID"
              required={true}
              {...form.register('submitterId')}
            />
          </Box>
          <Box className='flex-1'>
            <FormTextInput
              label="Contact Person"
              {...form.register('contactPerson')}
            />
          </Box>
        </Flex>

        <Flex gap="2" my="1">
          <Box className='flex-1'>
            <FormTextInput
              label="Phone"
              {...form.register('phone')}
            />
          </Box>
          <Box className='flex-1'>
            <FormTextInput
              label="Fax"
              {...form.register('fax')}
            />
          </Box>
          <Box className='flex-1'>
            <FormSelect
              label="Receiver"
              placeholder='Select'
              required={true}
              {...form.register('receiverId')}
              options={receiversList.map(r => ({ label: r.receiverName, value: r.id }))}
            />
          </Box>
        </Flex>

        <Flex gap="2" my="1">
          <Box className="flex-1">
            <FormSelect
              label="Practice Name"
              placeholder='Select'
              required={true}
              {...form.register('practiceId')}
              options={practiceList.map((r) => ({ label: r.name, value: r.id }))}
            />
          </Box>
          <Box className="flex-1"></Box>
          <Box className="flex-1"></Box>
        </Flex>

        <AddressComponent
          form={form}
          title='Primary Address'
        />
        <Flex gap="2" my="1">
          <Box className='flex-1'>
            <FormTextInput
              label="City"
              required={true}
              {...form.register('city')}
            />
          </Box>
          <Box className='flex-1'>
            <FormSelect
              label="State"
              placeholder='Select'
              required={true}
              {...form.register('state')}
              options={statesList.codes.map((r) => ({ label: r.displayName, value: r.displayName }))}
            />
          </Box>
          <Box className='flex-1'>
            <FormTextInput
              label="Zip"
              required={true}
              {...form.register('zip')}
            />
          </Box>
        </Flex>
      </Flex>

      <Flex mt="3" justify="end">
        <FormSubmitButton
          size="2"
          className='bg-[#151B4A]'
        >
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  );
}

export { SubmitterAddDialogForm };
