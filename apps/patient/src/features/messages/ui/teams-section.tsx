import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { BillingIcon, SchedulingIcon, TreatmentTeamIcon } from '@/components-v2'

interface TeamsSectionProps {
  selectedTeam: string
  setSelectedTeam: React.Dispatch<React.SetStateAction<string>>
}

const TeamsSection = ({ selectedTeam, setSelectedTeam }: TeamsSectionProps) => {
  return (
    <Flex className="mx-4" gap="2">
      <Flex
        gap="1"
        className={cn(
          'cursor-pointer rounded-4 border p-1',
          selectedTeam === 'treatment'
            ? 'border-[#6E56CF] bg-[#F5F2FF] text-[#6E56CF]'
            : 'border-pp-gray-2 text-pp-gray-1 ',
        )}
        align={'center'}
        onClick={() => setSelectedTeam('treatment')}
      >
        <TreatmentTeamIcon
          fill={selectedTeam === 'treatment' ? '#6E56CF' : '#8B8D98'}
        />
        <Text size={'1'}>Treatment Team</Text>
      </Flex>
      <Flex
        gap="1"
        className={cn(
          'cursor-pointer rounded-4 border p-1',
          selectedTeam === 'scheduling'
            ? 'border-[#F2AE40] bg-[#FEF7EC] text-[#F2AE40]'
            : 'border-pp-gray-2 text-pp-gray-1 ',
        )}
        align={'center'}
        onClick={() => setSelectedTeam('scheduling')}
      >
        <SchedulingIcon
          fill={selectedTeam === 'scheduling' ? '#F2AE40' : '#8B8D98'}
        />
        <Text size={'1'}>Scheduling Team</Text>
      </Flex>
      <Flex
        gap="1"
        className={cn(
          'cursor-pointer rounded-4 border p-1',
          selectedTeam === 'billing'
            ? 'border-[#0B68CB] bg-[#E1F0FF] text-[#0B68CB]'
            : 'border-pp-gray-2 text-pp-gray-1 ',
        )}
        align={'center'}
        onClick={() => setSelectedTeam('billing')}
      >
        <BillingIcon
          fill={selectedTeam === 'billing' ? '#0B68CB' : '#8B8D98'}
        />
        <Text size={'1'}>Billing Team</Text>
      </Flex>
    </Flex>
  )
}

export default TeamsSection
