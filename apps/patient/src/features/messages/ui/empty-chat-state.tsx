import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, Text } from '@radix-ui/themes'
import {
  BillingIcon,
  SchedulingIcon,
  SleepingIcon,
  TreatmentTeamIcon,
} from '@/components-v2'

const EmptyChatState = ({ selectedTeam }: { selectedTeam: string }) => {
  const getTeamColorAndIcon = (
    team: string,
  ): { color: string; icon: JSX.Element; message: string } => {
    switch (team.toLowerCase()) {
      case 'scheduling':
        return {
          color: '#FEF7EC',
          icon: <SchedulingIcon width="84" height="85" fill="#F2AE40" />,
          message:
            'Have trouble regarding scheduling? <br /> Write a message to Scheduling Team.',
        }
      case 'billing':
        return {
          color: '#E1F0FF',
          icon: <BillingIcon width="84" height="85" fill="#0B68CB" />,
          message:
            'Have trouble regarding billing? <br /> Write a message to Billing Team.',
        }
      case 'treatment':
        return {
          color: '#F5F2FF',
          icon: <TreatmentTeamIcon width="84" height="85" fill="#6E56CF" />,
          message:
            'Have trouble regarding treatment? <br /> Write a message to Care Team.',
        }
      default:
        return {
          color: '#EEF2F6',
          icon: <SleepingIcon />,
          message: 'Have something in mind? <br /> Write a message.',
        }
    }
  }

  const teamData = getTeamColorAndIcon(selectedTeam)
  return (
    <Flex
      className="h-[400px]"
      direction={'column'}
      align={'center'}
      justify={'center'}
    >
      <Box
        className={cn(
          'rounded-full p-5',
          selectedTeam ? `bg-[${teamData.color}]` : 'bg-pp-chip-1',
        )}
      >
        {teamData.icon}
      </Box>
      <Text className="text-center text-gray-11">
        <span dangerouslySetInnerHTML={{ __html: teamData.message }} />
      </Text>
    </Flex>
  )
}

export default EmptyChatState
