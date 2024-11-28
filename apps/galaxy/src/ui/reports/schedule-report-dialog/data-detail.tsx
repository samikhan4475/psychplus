import { Box, Flex, Text } from '@radix-ui/themes';
import { useStore } from '../store';
import { InfoIcon } from '@/components/icons';
import { ScheduleTemplateSchemaType } from './schedule-report-form';
import { useWatch } from 'react-hook-form';
import { format } from 'date-fns';

const DataDetail = () => {
  const { selectedTemplate } = useStore();

  const [beginOn, repeatInterval, scheduleDays, intervalOption] = useWatch<ScheduleTemplateSchemaType>({
    name: ['beginOn', 'repeatInterval', 'scheduleDays', 'intervalOption'],
  });

  const formattedBeginOn = beginOn
    ? format(new Date(beginOn.year, beginOn.month - 1, beginOn.day), 'MM/dd/yyyy')
    : "";

  const repeatDetails =
    repeatInterval === 'day' || repeatInterval === 'week'
      ? scheduleDays?.join(', ') || 'No days selected'
      : intervalOption || 'No interval option selected';

  return (
    <Flex className="rounded-[4px] bg-pp-bg-accent px-2 py-1.5 mt-3 mb-2 flex flex-row gap-1.5 " align="center">
      <Box className='w-[30px]'>
        <InfoIcon />
      </Box>
      <Text className="text-pp-black-3 my-1" size="1">
        You have scheduled the {selectedTemplate?.displayName ?? ""} report to start on {formattedBeginOn}, repeat every {repeatInterval} on {repeatDetails}
      </Text>
    </Flex>
  );
};

export default DataDetail;
