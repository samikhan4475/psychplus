import { Box, Text } from '@radix-ui/themes'

interface InfoFieldProps {
  label: string
  value?: string | null | number
  required?: boolean
}

const InfoField = ({ label, value, required }: InfoFieldProps) => {
  return (
    <>
      <Box>
        <Text weight="bold" className="text-1">
          {label}
        </Text>
        {required ? (
          <Text className="ml-[2px] text-[11px] text-red-9">*</Text>
        ) : null}
      </Box>
      <Box>
        <Text className="text-1">{value}</Text>
      </Box>
    </>
  )
}

export { InfoField }
