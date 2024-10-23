import { Flex, Grid, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

const PatientClaimDetails = () => {
  return (
    <Flex className="bg-pp-header-bg rounded-[5px] p-2">
      <Grid
        columns="2"
        gap="3"
        rows="repeat(2)"
        className=" border-pp-border mr-2 w-2/5 border-r border-solid"
      >
        <LabelAndValue label="Patient Name" value="Test User" />
        <LabelAndValue label="Gender" value="Male" />
        <LabelAndValue label="DOB" value="12/12/2023" />
        <LabelAndValue label="Account Number" value="2132131" />
      </Grid>
      <Grid columns="4" gap="3" rows="repeat(2)" className="w-3/5">
        <LabelAndValue label="Billed" value="$ 20.00" />
        <LabelAndValue label="Secondary Paid" value="$ 20.00" />
        <LabelAndValue label="Write Off" value="$ 20.00" />
        <LabelAndValue label="Last Modified By" value="NA" />
        <LabelAndValue label="Primary Paid" value="$ 20.00" />
        <LabelAndValue label="Patient Paid" value="$ 20.00" />
        <LabelAndValue label="Balance" value="$ 20.00" />
        <LabelAndValue label="Claim Status" value="New Charge" />
      </Grid>
    </Flex>
  )
}

interface LabelAndValueProps {
  label: string
  value?: string
}

const LabelAndValue = ({ label, value }: LabelAndValueProps) => (
  <Flex gap="1" className="whitespace-nowrap">
    <Text className="text-[11.5px] font-[600]">{label}</Text>
    <Text
      className={cn('text-[11.5px]', {
        'italic text-gray-9': !value,
      })}
    >
      {value ?? 'N/A'}
    </Text>
  </Flex>
)

export { PatientClaimDetails }
