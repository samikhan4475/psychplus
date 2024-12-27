import { Flex } from '@radix-ui/themes'
import { EndDateTime } from './end-date-time'
import { StartDateTime } from './start-date-time'
import { VolumeInput } from './volume'

const DateTimeAndVolume = ({ index }: { index: number }) => {
  return (
    <Flex direction="row" gap="3" className="flex-grow-0">
      <StartDateTime index={index} />
      <EndDateTime index={index} />
      <VolumeInput index={index} />
    </Flex>
  )
}

export { DateTimeAndVolume }
