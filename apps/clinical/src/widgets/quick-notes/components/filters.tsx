import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes'
import { Select } from '@psychplus/ui/select'
import { TextField } from '@psychplus/ui/text-field'

const Filters = () => (
  <Box className="mb-[1px] rounded-[2px] bg-[#ffffff] px-2 py-1.5">
    <Flex width="100%" justify="between" align="center">
      <Flex align="center" gap="2">
        <Text className="text-[12px]">Title</Text>
        <Select.Root defaultValue="behavior_identification" size="2" disabled>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="behavior_identification">
                Behavior Identification
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex align="center" gap="2">
        <Text className="text-[12px]">Type</Text>
        <Select.Root defaultValue="behavior_identification" size="2" disabled>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="behavior_identification">
                Out Pt, New Pt, In-Person
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex align="center" gap="2">
        <Text className="text-[12px]">Provider</Text>
        <Select.Root defaultValue="behavior_identification" size="2" disabled>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="behavior_identification">
                Dr. Andrew Tate
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex align="center" gap="2">
        <Text className="text-[12px]">Co-Signer</Text>
        <Select.Root defaultValue="behavior_identification" size="2" disabled>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="behavior_identification">
                Roger More
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex align="center" gap="2">
        <Text className="text-[12px]">Location</Text>
        <Select.Root defaultValue="behavior_identification" size="2" disabled>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="behavior_identification">
                Willow Clinic
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex align="center" gap="2">
        <Text className="text-[12px]">Date & Time</Text>
        <TextField.Root defaultValue="2/9/2024" placeholder="Date" disabled />

        <TextField.Root defaultValue="08:00pm" placeholder="Time" disabled />
      </Flex>
    </Flex>
  </Box>
)

export { Filters }
