import { SelectInput, FormFieldError, FormFieldLabel, FormFieldContainer } from '@/components';
import { repeatCountOptions, monthRepeatCountOptions } from './constants';
import { useFormContext } from 'react-hook-form';

const RepeatCountSelect = () => {
  const { watch } = useFormContext();
  const repeatInterval = watch('repeatInterval');
  const intervaloptions = repeatInterval === 'month' ? monthRepeatCountOptions : repeatCountOptions
  return (
    <FormFieldContainer className='flex-row items-center '>
      <FormFieldLabel className="!text-1">
        Repeat Schedule Every
      </FormFieldLabel>
      <SelectInput
        field="repeatCount"
        className="w-full"
        buttonClassName="min-w-[120px] h-6 border-pp-gray-2 rounded-2 !outline-none"
        options={intervaloptions}
        defaultValue="notrepeat"
      />
      <FormFieldError name="repeatCount" />
    </FormFieldContainer>
  );
};

export { RepeatCountSelect };
