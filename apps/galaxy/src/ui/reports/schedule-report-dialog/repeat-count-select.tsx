import { SelectInput, FormFieldError, FormFieldLabel, FormFieldContainer } from '@/components';
import { repeatCountOptions } from './constants';

const RepeatCountSelect = () => {
  return (
    <FormFieldContainer className='flex-row items-center '>
      <FormFieldLabel className="!text-1" required>
        Repeat every
      </FormFieldLabel>
      <SelectInput
        field="repeatCount"
        className="w-full"
        buttonClassName="min-w-[120px] h-6 border-pp-gray-2 rounded-2 !outline-none"
        options={repeatCountOptions}
        defaultValue="notrepeat"
      />
      <FormFieldError name="repeatCount" />
    </FormFieldContainer>
  );
};

export { RepeatCountSelect };
