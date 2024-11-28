import { FormFieldContainer, FormFieldError, FormFieldLabel, SelectInput } from '@/components';
import { durationOptions } from './constants';
import { Flex } from '@radix-ui/themes';

const ForSelect = () => {
  return (
    <FormFieldContainer className='items-start gap-1'>
      <Flex >
      <FormFieldLabel className="!text-1 mr-1">
        For
      </FormFieldLabel>
      <SelectInput
        field="forDuration"
        className="w-full"
        buttonClassName="min-w-[120px] h-6 border-pp-gray-2 rounded-2 !outline-none"
        options={durationOptions}
      />
      </Flex>
      <FormFieldError name="forDuration" />
    </FormFieldContainer>
  );
};

export { ForSelect };

