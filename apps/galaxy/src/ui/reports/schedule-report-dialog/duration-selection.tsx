import { FormFieldContainer, FormFieldLabel } from '@/components';
import { DurationInterval } from './duration-interval';
import { NumberOfDuration } from './duration-number-field';
import { ForSelect } from './for-select';

const DurationSelection = () => {
  return (
    <FormFieldContainer className='flex-row items-start gap-2 ml-1'>
      <ForSelect />
      <NumberOfDuration />
      <DurationInterval />
    </FormFieldContainer>
  );
};

export { DurationSelection };

