import { Box, Flex } from '@radix-ui/themes';
import { AddTemplateButton } from './add-template-button';
import { TitleInputField } from './add-title-field';
import { CategorySelect } from './category-select';
import { CodeInput } from './code-input';
import { ParametersTable } from './parameter-table';
import { ReportUploader } from './report-uploader';
import { RolesMultiSelect } from './roles-multi-select';
import ScheduleReportSwitch from './schedule-report-switch';

const TemplateFormFields = () => {
  return (
    <>
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
      <AddTemplateButton />
    </>
  );
};
export { TemplateFormFields }