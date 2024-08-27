'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { ListFilterIcon } from 'lucide-react'
import { Select } from '@psychplus/ui/select'

const FilterForm = () => {
  return (
    <Box className="rounded-2 p-1 shadow-2">
      <Flex p="1" gap={'6'} align={'center'}>
        <Heading size={'6'}>Service</Heading>
        <Button
          variant="ghost"
          highContrast
          className="rounded-2 border border-solid border-[#9E9898CC] bg-[#D9E2FC] font-medium text-[#194595] hover:bg-[#c2d1ff] active:bg-[#bacbfc]"
        >
          <ListFilterIcon size={12} color="#000" /> More Filters
        </Button>
      </Flex>
      <Box my="2">
        <Flex wrap={'wrap'} align={'center'} gap={'3'}>
          <FilterTextField label="ID" placeholder="Add ID" />
          <FilterSelectField
            label="Location Type"
            placeholder="Select Type"
            options={['1', '2']}
          />
          <FilterTextField label="Location Name" placeholder="Add Name" />
          <FilterSelectField
            label="Service"
            placeholder="Select type"
            options={['1', '2']}
          />
          <FilterSelectField
            label="POS"
            placeholder="Select"
            options={['1', '2']}
          />
          <FilterSelectField
            label="Primary Provider"
            placeholder="Select"
            options={['1', '2']}
          />
          <FilterSelectField
            label="Co-Signer Type"
            placeholder="Select type"
            options={['1', '2']}
          />
          <FilterSelectField
            label="Co-Signer"
            placeholder="Select"
            options={['1', '2']}
          />
          <FilterSelectField
            label="Max Booking Freq"
            placeholder="Select"
            options={['1', '2']}
          />
          <FilterSelectField
            label="Visit Type"
            placeholder="Select type"
            options={['1', '2']}
          />
          <FilterTextField label="Address" placeholder="Search by address" />
          <FilterSelectField
            label="Status"
            placeholder="Select type"
            options={['1', '2']}
          />
          <Button variant="ghost" color="gray" className="text-[#000]">
            Hide Filters
          </Button>
          <Button className="h-25 mr-n5 bg-[#151B4A]">
            <MagnifyingGlassIcon />
          </Button>
          <Button variant="outline" color="gray" className="text-[#000]">
            Clear
          </Button>
        </Flex>
      </Box>
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
  <Flex align="center" className="gap-[6px]">
    <Text size="2" weight={'medium'}>
      {label}
    </Text>
    <TextField.Root
      className="w-[120px]"
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
  <Flex align="center" className="gap-[6px]">
    <Text size="2" weight={'medium'}>
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
