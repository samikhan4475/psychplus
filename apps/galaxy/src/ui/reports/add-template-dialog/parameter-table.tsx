import { DataTable, FormFieldError } from '@/components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { STATUS } from '../types';
import { AddRowButton } from './add-row-button';
import { createColumns } from './parameter-table-columns';
import { TemplateSchemaType } from './schema';

const ParametersTable = () => {
  const { control, setValue, watch, formState: { errors }  } = useFormContext<TemplateSchemaType>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'parameters',
  });
  const templateID = watch('id');
  const addRow = () => {
    append({
      parameterCode: '',
      displayName: '',
      resourceStatus: STATUS.ACTIVE,
      displayOrder: fields.length,
    });
  };

  fields.forEach((field, index) => {
    if (field.reportTemplateId) {
      setValue(`parameters.${index}.reportTemplateId`, field.reportTemplateId);
    }else if (field.id && templateID) {
      setValue(`parameters.${index}.reportTemplateId`, templateID);
    } else if (field.id) {
      setValue(`parameters.${index}.reportTemplateId`, field.id);
    }
    setValue(`parameters.${index}.displayOrder`, index);
  });
  const parameterErrors = errors.parameters || {};
  const firstErrorKey = Object.keys(parameterErrors).find((key) => {
    const numericKey = Number(key);
    return parameterErrors[numericKey]?.parameterCode;
  });

  return (
    <>
      <AddRowButton onAddRow={addRow} />
      <DataTable columns={createColumns(move, remove, fields.length)} data={fields} />
      {firstErrorKey && (
        <FormFieldError name={`parameters.${firstErrorKey}.parameterCode`} />
      )}
    </>
  );
};

export { ParametersTable };

