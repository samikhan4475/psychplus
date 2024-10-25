import { FormContainer } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addTemplateAction } from '../actions';
import { useStore } from '../store';
import { handleUploadReport } from '../utils';
import { addTemplateSchema, AddTemplateSchemaType } from './schema';
import { TemplateFormFields } from './template-form';

interface AddTemplateFormProps {
  onClose?: () => void;
}

const AddTemplateForm = ({ onClose }: AddTemplateFormProps) => {
  const form = useForm<AddTemplateSchemaType>({
    resolver: zodResolver(addTemplateSchema),
    defaultValues: {
      displayName: '',
      shortName: '',
      reportCategoryCode: '',
      parameters: [],
      isAdhocAllowed: false,
      permittedRoles: [],
    },
    mode: 'onChange',
  });

  const fetchReportsAndTemplates = useStore((state) => state.fetchReportsAndTemplates);
  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);

  const onSubmit: SubmitHandler<AddTemplateSchemaType> = async (data) => {
    const { definitionPayloadUrl, ...payload } = data;

    const addTemplateResponse = await addTemplateAction(payload);
    if (addTemplateResponse?.state === 'success') {
      const templateId = addTemplateResponse.data?.id;

      if (definitionPayloadUrl && templateId) {
        const uploadSuccess = await handleUploadReport(definitionPayloadUrl, templateId);
        if (!uploadSuccess) return;
      }

      toast.success('Template and report uploaded successfully!');
      fetchReportsAndTemplates();
      setSelectedTemplate(null);
      if (onClose) onClose();
    } else {
      toast.error(
        addTemplateResponse.error ?? 'There was a problem saving your changes. Please try again.'
      );
    }
  };

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <TemplateFormFields  />
    </FormContainer>
  );
};

export { AddTemplateForm };

