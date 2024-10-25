import { SelectCell } from '@/components';
import { useFormContext } from 'react-hook-form';
import { useStore } from '../../store';
import { getFieldType } from '../../utils';
import { AddTemplateSchemaType } from '../schema';

const FieldCodeCell = ({ rowIndex }: { rowIndex: number }) => {
  const { watch, setValue } = useFormContext<AddTemplateSchemaType>();
  const { templateFilters } = useStore();
  const parameters = templateFilters?.codes;

  const reportParametersOptions = parameters?.map((parameter) => ({
    label: parameter.code,
    value: parameter.code,
  }));

  return (
    <SelectCell
      value={watch(`parameters.${rowIndex}.reportParameterCode`)}
      options={reportParametersOptions || []}
      onValueChange={(value) => {
        setValue(`parameters.${rowIndex}.reportParameterCode`, value);
        setValue(`parameters.${rowIndex}.displayName`, getFieldType( parameters || [] , value ));
      }}
    />
  );
};

export { FieldCodeCell };

