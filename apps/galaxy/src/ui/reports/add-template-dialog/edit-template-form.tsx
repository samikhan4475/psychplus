import { FormContainer } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { editTemplateAction } from '../actions';
import { useStore } from '../store';
import { handleUploadReport } from '../utils';
import { editTemplateSchema, EditTemplateSchemaType } from './schema';
import { TemplateFormFields } from './template-form';

interface EditTemplateFormProps {
  defaultValues?: EditTemplateSchemaType;
  onClose?: () => void;
}

const EditTemplateForm = ({ defaultValues, onClose }: EditTemplateFormProps) => {
  const sortedParameters = defaultValues?.parameters?.sort((a, b) => {
    return (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
  });
  
  const form = useForm<EditTemplateSchemaType>({
    resolver: zodResolver(editTemplateSchema),
    defaultValues: {
      ...defaultValues,
      parameters: sortedParameters,
    },
    mode: 'onChange',
  });

  const fetchReportsAndTemplates = useStore((state) => state.fetchReportsAndTemplates);
  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);

  const onSubmit: SubmitHandler<EditTemplateSchemaType> = async (data) => {
    const { definitionPayloadUrl, ...payload } = data;

    const editTemplateResponse = await editTemplateAction({
      templateId: defaultValues?.id || '',
      data: payload,
    });

    if (definitionPayloadUrl && defaultValues?.id && (definitionPayloadUrl !== defaultValues.definitionPayloadUrl)) {
      const uploadSuccess = await handleUploadReport(definitionPayloadUrl, defaultValues.id);
      if (!uploadSuccess) return;
    }

    if (editTemplateResponse.state === "success") {
      fetchReportsAndTemplates();
      setSelectedTemplate(null);
      if (onClose) onClose();
    } else {
      toast.error(
        editTemplateResponse.error ?? 'There was a problem saving your changes. Please try again.'
      );
    }
  };

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <TemplateFormFields />
    </FormContainer>
  );
};

export { EditTemplateForm };

