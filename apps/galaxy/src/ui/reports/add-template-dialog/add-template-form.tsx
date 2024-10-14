import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex } from '@radix-ui/themes';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { FormContainer } from '@/components';
import { TitleInputField } from './add-title-field';
import { CodeInput } from './code-input';
import { CategorySelect } from './category-select';
import { ParametersTable } from './parameter-table';
import { RolesMultiSelect } from './roles-multi-select';
import { ReportUploader } from './report-uploader';
import ScheduleReportSwitch from './schedule-report-switch';
import { AddTemplateButton } from './add-template-button';

const schema = z.object({
  type: z.string().optional(),
  title: z.string().optional(),
  code: z.string().optional(),
  isSchedule: z.boolean().optional(),
  reportTemplateParameters: z.array(
    z.object({
      reportParameterCode: z.string().optional(),
      displayName: z.string().optional(),
      resourceStatus: z.string().optional(),
      id: z.string().optional(),
    })
  ).optional(),
});

type AddTemplateSchemaType = z.infer<typeof schema>;

const AddTemplateForm = () => {
  const form = useForm<AddTemplateSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: '',
      title: '',
      code: '',
      reportTemplateParameters: [],
      isSchedule: false
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<AddTemplateSchemaType> = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex className="gap-x-3.5">
        <Box className="w-[50%]">
          <TitleInputField />
        </Box>
        <Box className="w-[25%]">
          <CodeInput />
        </Box>
        <Box className="w-[25%]">
          <CategorySelect />
        </Box>
      </Flex>
      <ParametersTable />
      <RolesMultiSelect />
      <Flex className="w-full gap-x-3 text-[12px] mt-3">
        <ReportUploader />
        <ScheduleReportSwitch />
      </Flex>
      <AddTemplateButton  />
    </FormContainer>
  );
};

export { AddTemplateForm, type AddTemplateSchemaType };
