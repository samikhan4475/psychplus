import { TextCell } from '@/components';
import { useFormContext } from 'react-hook-form';
import { useStore } from '../../store';
import { AddTemplateSchemaType } from '../schema';

interface FieldTypeCellProps {
  rowIndex: number;
}

const FieldTypeCell = ({ rowIndex }: FieldTypeCellProps) => {
  const { watch } = useFormContext<AddTemplateSchemaType>();
  const { templateFilters } = useStore();
  const parameters = templateFilters?.codes;

  const getDataTypeFromAttributes = (code: string) => {
    const parameter = parameters?.find((parameter) => parameter.code === code);
    const dataTypeAttribute = parameter?.codeAttributes?.find((attr) => attr.name === 'DataType');
    return dataTypeAttribute?.content || '';
  };

  const reportParameterCode = watch(`parameters.${rowIndex}.reportParameterCode`) || '';

  return <TextCell>{getDataTypeFromAttributes(reportParameterCode)}</TextCell>;
};

export { FieldTypeCell };

