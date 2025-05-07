'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useStore } from '@/store'
import { AcsInfo } from '../types'
import { AppointmentInfo } from './appointment-info'

interface AppointmentsListProps {
  acsInfo: AcsInfo
}

const AppointmentsList = ({ acsInfo }: AppointmentsListProps) => {
  const { appoinmentList } = useStore((state) => ({
    appoinmentList: state.appoinmentList,
  }))

  return (
    <Flex
      direction="column"
      width={'20vw'}
      height={'100%'}
      className="bg-blackA-12"
    >
      <Flex
        align="center"
        justify="between"
        pt="3"
        mx="2"
        pb="2"
        gap="2"
        className="text-pp-bg-accent border-whiteA-4 border-b"
      >
        <Text className="inline-block select-none text-[11px] font-[500]">
          PATIENT QUEUE
        </Text>
      </Flex>
      {appoinmentList?.map((item) => (
        <AppointmentInfo key={item.gv} appointment={item} acsInfo={acsInfo} />
      ))}
    </Flex>
  )
}

export { AppointmentsList }
