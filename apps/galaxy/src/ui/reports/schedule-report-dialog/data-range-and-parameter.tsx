import { Box, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DataDetail } from './data-detail'
import ReportName from './report-name'
import ScheduleParameters from './schedule-parameters'
import { ScheduleTemplateSchemaType } from './schema'

const DataRangeAndParameter = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>()
  const repeatCount = form.watch('repeatCount')
  return (
    <Box className="bg-pp-bg-table-cell border-pp-focus-bg mb-2 mt-3 flex flex-col gap-1.5 rounded-[4px] border px-2 py-1.5">
      <Text className="text-pp-black-3" size="2" weight="medium">
        Data Range & Parameter <Text className="text-pp-red ml-1">*</Text>
      </Text>
      <Text as="label" size="1">
        Select the data range you wish to include in the report.
      </Text>
      <ReportName />
      <ScheduleParameters />
      {repeatCount === '1' && <DataDetail />}
    </Box>
  )
}

export { DataRangeAndParameter }
