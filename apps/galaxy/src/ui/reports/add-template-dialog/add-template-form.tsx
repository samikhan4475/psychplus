import { FormContainer, LoadingPlaceholder } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { addTemplateAction } from '../actions';
import { useStore } from '../store';
import { handleUploadReport } from '../utils';
import { addTemplateSchema, AddTemplateSchemaType } from './schema';
import { TemplateFormFields } from './template-form';

interface AddTemplateFormProps {
  onClose?: () => void;
}

const AddTemplateForm = ({ onClose }: AddTemplateFormProps) => {
  const [loading, setLoading] = useState(false);

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

  const fetchTemplates = useStore((state) => state.fetchTemplates);
  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);

  const onSubmit: SubmitHandler<AddTemplateSchemaType> = async (data) => {
    setLoading(true);

    const { definitionPayloadUrl, ...payload } = data;
    const addTemplateResponse = await addTemplateAction(payload);

    if (addTemplateResponse?.state === 'success') {
      const templateId = addTemplateResponse.data?.id;

      if (definitionPayloadUrl && templateId) {
        const uploadSuccess = await handleUploadReport(definitionPayloadUrl, templateId);
        if (!uploadSuccess) {
          setLoading(false);
          return;
        }
      }

      toast.success('Template and report uploaded successfully!');
      fetchTemplates();
      setSelectedTemplate(null);
      if (onClose) onClose();
    } else {
      toast.error(
        addTemplateResponse.error ?? 'There was a problem saving your changes. Please try again.'
      );
    }

    setLoading(false);
  };

  return (
    <FormContainer form={form} onSubmit={onSubmit} className='relative'>
      {loading ?
        <>
          <Flex height="100%" align="center" justify="center" width="100%" className="absolute z-10 bg-pp-gray-4 bg-opacity-30">
            <LoadingPlaceholder />
          </Flex>
          <TemplateFormFields />
        </>
        :
        <TemplateFormFields />
      }
    </FormContainer>
  );
};

export { AddTemplateForm };
