import { Box, Text } from '@radix-ui/themes';
import ReportName from './report-name';
import ScheduleParameters from './schedule-parameters';
import DataDetail from './data-detail';

const DataRangeAndParameter = () => {
  return (
    <Box className="rounded-[4px] bg-pp-bg-table-cell px-2 py-1.5 mt-3 mb-2 flex flex-col gap-1.5 border-pp-focus-bg border">
      <Text className="text-pp-black-3" size="2" weight="medium">
        Data Range and Parameter <Text className="text-pp-red ml-1">*</Text>
      </Text>
      <Text as="label" size="1">
        Select the data range you wish to include in the report.
      </Text>
      <ReportName />
      <ScheduleParameters />
      <DataDetail />
    </Box>
  );
};

export default DataRangeAndParameter;
