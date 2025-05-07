'use client'

import { Flex, Text } from '@radix-ui/themes'
import { MAIN_PAGE_FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { useStore } from '@/store'
import { AppointmentsList, CallCompositeContainer } from './blocks'
import { ProviderLink } from './blocks/provider-link'
import { AcsInfo } from './types'

interface Props {
  acsInfo: AcsInfo
}

const CallView = ({ acsInfo }: Props) => {
  const isAvfeatureFlagEnabled = useFeatureFlagEnabled(
    MAIN_PAGE_FEATURE_FLAGS.ehr9475AudioVideoTelemedicine,
  )
  const { currentCall, appoinmentList } = useStore((state) => ({
    currentCall: state.currentCall,
    appoinmentList: state.appoinmentList,
  }))

  if (!isAvfeatureFlagEnabled) {
    return <Text>Feature not enabled</Text>
  }

  return (
    <Flex height={'100%'}>
      <AppointmentsList acsInfo={acsInfo} />
      {currentCall?.appointment ? (
        <CallCompositeContainer />
      ) : (
        <Flex direction={'column'} flexGrow={'1'}>
          <ProviderLink />
          <Flex
            width={'100%'}
            height={'80%'}
            align={'center'}
            justify={'center'}
          >
            <Text>
              {appoinmentList?.length
                ? 'Press the "Join" button to start the call.'
                : 'There are currently no patients in the queue.'}
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export { CallView }
