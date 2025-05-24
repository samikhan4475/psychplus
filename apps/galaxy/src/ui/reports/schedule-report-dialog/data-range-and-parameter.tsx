import { Box, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DataDetail } from './data-detail'
import { DurationSelection } from './duration-selection'
import ReportName from './report-name'
import ScheduleParameters from './schedule-parameters'
import { ScheduleTemplateSchemaType } from './schema'

const DataRangeAndParameter = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>()
  const repeatCount = form.watch('repeatCount')
  return (
    <Box className="bg-pp-bg-table-cell border-pp-focus-bg mb-2 mt-3 flex flex-col gap-y-2 rounded-[4px] border px-2 py-1.5">
      <Box className="bg-white rounded-[4px] p-2">
        <ReportName />
        <ScheduleParameters />
      </Box>
      <Box className="bg-white rounded-[4px] p-2">
        <Text className="text-pp-black-3 my-1" weight="medium" size="1">
          Select the data range you wish to include in the report.
        </Text>
        <DurationSelection />
      </Box>
      {repeatCount === '1' && <DataDetail />}
    </Box>
  )
}

export { DataRangeAndParameter }
