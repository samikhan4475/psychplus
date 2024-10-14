import { useFormContext } from 'react-hook-form';
import { useStore } from '../../store';
import { getFieldType } from '../../utils';
import { AddTemplateSchemaType } from '../add-template-form';
import { InputCell } from '../input-cell';

interface FieldLabelCellProps {
  rowIndex: number;
}

const FieldLabelCell = ({ rowIndex }: FieldLabelCellProps) => {
  const { watch } = useFormContext<AddTemplateSchemaType>();
  const { templateFilters } = useStore();
  const parameters = templateFilters?.codes;
  const reportParameterCode = watch(`reportTemplateParameters.${rowIndex}.reportParameterCode`) || '';

  return (
    <InputCell
      name={`reportTemplateParameters.${rowIndex}.displayName`}
      defaultValue={getFieldType( parameters || [], reportParameterCode)}
    />
  );
};

export { FieldLabelCell };

