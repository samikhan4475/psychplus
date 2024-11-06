import { useFormContext } from 'react-hook-form';
import { useStore } from '../../store';
import { getFieldType } from '../../utils';
import { InputCell } from '../input-cell';
import { AddTemplateSchemaType } from '../schema';

interface FieldLabelCellProps {
  rowIndex: number;
}

const FieldLabelCell = ({ rowIndex }: FieldLabelCellProps) => {
  const { watch } = useFormContext<AddTemplateSchemaType>();
  const { templateFilters } = useStore();
  const parameters = templateFilters?.codes;
  const parameterCode = watch(`parameters.${rowIndex}.parameterCode`) || '';

  return (
    <InputCell
      field={`parameters.${rowIndex}.displayName`}
      defaultValue={getFieldType( parameters || [], parameterCode)}
    />
  );
};

export { FieldLabelCell };

