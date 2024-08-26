import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { Select } from '@psychplus/ui/select'

const FilterForm = () => {
  return (
    <Box className="rounded-2 bg-[#fff] px-2 py-1 shadow-3">
      <Flex wrap={'wrap'} align={'center'} className="gap-[6px]" width={'100%'}>
        <FilterTextField label="ID" placeholder="Add ID" />
        <FilterSelectField
          label="Location Type"
          placeholder="Select Type"
          options={['1', '2']}
        />
        <FilterTextField label="Location Name" placeholder="Add Name" />
        <FilterSelectField
          label="State"
          placeholder="Select type"
          options={['1', '2']}
        />
        <FilterSelectField
          label="Zip"
          placeholder="Select"
          options={['1', '2']}
        />
        <FilterTextField label="Taxonomy" placeholder="Add TN" />
        <FilterTextField label="NPI" placeholder="Add NPI" />
        <FilterTextField label="Phone" placeholder="Add Phone" />
        <FilterSelectField
          label="Status"
          placeholder="Select type"
          options={['1', '2']}
        />
        <Button variant="outline" color="gray" className="text-[#000]">
          Clear
        </Button>
        <Button className="h-25 mr-n5 bg-[#151B4A]">
          <MagnifyingGlassIcon />
        </Button>
      </Flex>
    </Box>
  )
}

const FilterTextField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
}) => (
  <Flex align="center" gap={'1'}>
    <Text size="2" weight={'bold'}>
      {label}
    </Text>
    <TextField.Root
      className="w-[120px]"
      size={'2'}
      placeholder={placeholder}
      value={value}
      onChange={({ target: { value } }) => onChange?.(value)}
    />
  </Flex>
)

const FilterSelectField = ({
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  options: string[]
}) => (
  <Flex align="center" gap={'1'}>
    <Text size="2" weight={'bold'}>
      {label}
    </Text>
    <Select.Root value={value} size="2" name={'name'} onValueChange={onChange}>
      <Select.Trigger className="w-[120px]" placeholder={placeholder} />
      <Select.Content position="popper">
        {options?.map((option) => (
          <Select.Item value={option} key={option}>
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  </Flex>
)

export { FilterForm }
