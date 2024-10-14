import { DataTable } from '@/components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AddRowButton } from './add-row-button';
import { AddTemplateSchemaType } from './add-template-form';
import { createColumns } from './parameter-table-columns';
import { STATUS } from '../types';

const ParametersTable = () => {
  const { control } = useFormContext<AddTemplateSchemaType>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'reportTemplateParameters',
  });

  const addRow = () => {
    append({
      reportParameterCode: '',
      displayName: '',
      resourceStatus: STATUS.ACTIVE,
    });
  };

  return (
    <>
      <AddRowButton onAddRow={addRow} />
      <DataTable columns={createColumns(move, remove, fields.length)} data={fields} />
    </>
  );
};

export { ParametersTable };

