import { FormFieldContainer, FormFieldError, SelectInput } from '@/components';
import { intervalOptions } from './constants';

const DurationInterval = () => {
  return (
    <FormFieldContainer>
      <SelectInput
        field="durationInterval"
        className="w-full"
        buttonClassName="min-w-[120px] h-6 border-pp-gray-2 rounded-2 !outline-none"
        options={intervalOptions}
      />
      <FormFieldError name="durationInterval" />
    </FormFieldContainer>
  );
};

export { DurationInterval };

