import { Button, Flex, Text } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, TextAreaInput } from '@/components'

const Badge = ({ text }: { text: string }) => {
  return (
    <Flex
      className="bg-pp-green-100 border-pp-green-2 rounded-5 border border-solid"
      align="center"
      pl="2"
      pr="2"
    >
      <Text className="text-pp-green-1 text-1 font-regular">{text}</Text>
    </Flex>
  )
}

const TreatmentObservation = () => {
  return (
    <Flex direction="column" gap="1">
      <Flex align={'center'} gap={'2'}>
        <BlockLabel required className="text-2 font-[600]">
          Treatment Observation & Patient Response
        </BlockLabel>
        <FormFieldError name="treatmentAndObservation" />
      </Flex>

      <TextAreaInput
        field="treatmentAndObservation"
        className="h- h-16 w-[50%]"
      />

      <Flex
        direction="row"
        className="border-pp-grey rounded-2 border border-solid align-middle"
        p="1"
        justify="between"
      >
        <Flex direction="row" align="center" gap="2">
          <Text className="text-pp-black-3 text-1 font-[600]">
            {`Today's PHQ-9`}
          </Text>
          <Badge text="Score 9" />
          <Badge text="Completed" />
          <Text className="text-pp-black-3 text-1 font-regular">
            03/25/2024, 09:27:30
          </Text>
        </Flex>
        <Flex direction="row" align="center" gap="2">
          <Button className="border-pp-grey bg-white h-5 w-7 rounded-1 border border-solid">
            <Text weight="regular" className="text-pp-black-3 text-1">
              HX
            </Text>
          </Button>
          <Button className="border-pp-grey bg-white h-5 w-10 rounded-1 border border-solid">
            <Text weight="regular" className="text-pp-black-3 text-1">
              View
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { TreatmentObservation }
