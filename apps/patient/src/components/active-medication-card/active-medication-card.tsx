'use client'

import { Flex, Text } from '@radix-ui/themes'

//we will fetch this Data from API
const activeMedicationData = [
  {
    name: 'Advil 200 mg tablet',
    prescription: '200 mg tablet - 10 Each - Take 1 tablet by mouth daily',
    supply: '0 days supply',
    refills: 0,
    end: '9/14/2023',
    provider: 'Test Prescriber',
    speciality: 'RxCare',
  },
  {
    name: 'Advil Dual Action 125 mg-250 mg tablet',
    prescription: '125-250 mg tablet - 3 Each - test direction',
    supply: '0 days supply',
    refills: 2,
    end: '9/18/2023',
    provider: 'Test Prescriber',
    speciality: 'RxCare',
  },
]

const ActiveMedicationCard = () => {
  return (
    <Flex
      className="flex-grow gap-8 rounded-6 border border-gray-2 shadow-3"
      p="6"
      direction="column"
    >
      <Text size="7" className="font-bold">
        Active Medications
      </Text>

      {activeMedicationData.length > 0 ? (
        activeMedicationData.map((med) => (
          <Flex
            key={med.name}
            className="flex-wrap rounded-2 border"
            p="5"
            gap="5"
            direction="column"
          >
            <Flex
              className="w-full flex-wrap max-xs:flex-col xs:flex-col sm:flex-col md:flex-row lg:flex-row"
              gap="3"
            >
              <Flex className="flex-1">
                <Text size="5" className="font-bold">
                  {med.name}
                </Text>
              </Flex>
              <Flex className="flex-1">
                <Text size="4">{med.prescription}</Text>
              </Flex>
              <Flex className="flex-1">
                <Text size="4">{med.supply}</Text>
              </Flex>
              <Flex className="flex-1">
                <Text size="4">Refills: {med.refills}</Text>
              </Flex>
              <Flex>
                <Text size="4">Ends: {med.end}</Text>
              </Flex>
            </Flex>

            <Flex className="w-full flex-wrap max-xs:flex-col xs:flex-col sm:flex-col md:flex-row lg:flex-row">
              <Flex className="flex-1">
                <Text size="4">Comments: -</Text>
              </Flex>
              <Flex className="flex-1">
                <Text size="4">Provider: {med.provider}</Text>
              </Flex>
              <Flex>
                <Text size="4" className="font-bold">
                  Specialty {med.speciality}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))
      ) : (
        <Flex justify="center">
          <Text size="5" className="font-bold">
            No medication available.
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export { ActiveMedicationCard }
