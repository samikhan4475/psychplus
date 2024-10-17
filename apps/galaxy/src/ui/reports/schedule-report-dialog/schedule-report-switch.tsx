import { FormFieldContainer, FormSwitch } from '@/components';
import { Flex, Text } from '@radix-ui/themes';

const ScheduleReportSwitch = () => {

  return (
    <FormFieldContainer className="w-[45%] rounded-[4px] bg-pp-bg-accent px-2 py-1.5 mt-3 flex-row gap-1.5 justify-between items-center">
      <Text className="text-pp-black-3" size="1" weight="medium">
        Is this schedule only report
      </Text>
      <Text as="label" size="1" weight="medium">
        <Flex className="gap-1.5" align="center">
          <FormSwitch
            field="isSchedule"
            color='blue'
          />
          Yes
        </Flex>
      </Text>
    </FormFieldContainer>
  );
};

export default ScheduleReportSwitch;
