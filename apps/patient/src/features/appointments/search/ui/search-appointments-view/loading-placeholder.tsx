import { Flex } from '@radix-ui/themes'
import { Skeleton } from './skeleton'

interface LoadingPlaceholderProps {
  showFilters?: boolean
}

const LoadingPlaceholder = ({ showFilters }: LoadingPlaceholderProps) => (
  <Flex direction="column" width="100%" className="bg-white">
    {showFilters ? <FiltersPlaceholder /> : null}
    <BannerPlaceholder />
    <Flex direction="column" className="gap-2 sm:gap-0">
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
    </Flex>
  </Flex>
)

const FiltersPlaceholder = () => (
  <Flex justify="between" py={{ initial: '3', sm: '5' }} px={{ initial: '2', sm: '5' }} gap={{ initial: '2', sm: '6' }} direction={{ initial: 'column', sm: 'row' }}>
    <Flex gap={{ initial: '2', sm: '4' }}>
      <Skeleton className="h-[40px] w-[100px] sm:h-[50px] sm:w-[150px]" />
      <Skeleton className="h-[40px] w-[100px] sm:h-[50px] sm:w-[150px]" />
    </Flex>
    <Flex gap={{ initial: '2', sm: '4' }}>
      <Skeleton className="h-[35px] w-[70px] sm:h-[45px] sm:w-[95px]" />
      <Skeleton className="h-[35px] w-[70px] sm:h-[45px] sm:w-[95px]" />
      <Skeleton className="h-[35px] w-[70px] sm:h-[45px] sm:w-[95px]" />
      <Skeleton className="h-[35px] w-[70px] sm:h-[45px] sm:w-[95px]" />
    </Flex>
  </Flex>
)

const BannerPlaceholder = () => (
  <Flex
    align="center"
    justify="between"
    py={{ initial: '3', sm: '5' }}
    px={{ initial: '2', sm: '5' }}
    className="border-y border-y-gray-5"
    direction={{ initial: 'column', sm: 'row' }}
    gap={{ initial: '2', sm: '0' }}
  >
    <Skeleton className="h-[30px] w-[90px] sm:h-[40px] sm:w-[125px]" />
    <Flex gap={{ initial: '2', sm: '6' }} justify="center" className="flex-1 flex-wrap">
      {[...Array(7)].map((_, i) => (
        <Skeleton key={crypto.randomUUID()} className="h-[20px] w-[50px] sm:h-[30px] sm:w-[75px]" />
      ))}
    </Flex>
  </Flex>
)

const AppointmentPlaceholder = () => (
  <Flex py={{ initial: '3', sm: '5' }} px={{ initial: '2', sm: '5' }} className="border-b border-b-gray-5 flex-col sm:flex-row gap-4 sm:gap-0">
    <Flex gap={{ initial: '2', sm: '4' }}>
      <Skeleton className="rounded-full h-[60px] w-[60px] sm:h-[100px] sm:w-[100px]" />
      <Flex direction="column">
        <Skeleton className="mt-2 h-[18px] w-[90px] sm:h-[25px] sm:w-[150px]" />
        <Skeleton className="mt-2 h-[10px] w-[60px] sm:h-[15px] sm:w-[100px]" />
        <Skeleton className="mt-2 h-[25px] w-[90px] sm:h-[40px] sm:w-[150px]" />
        <Flex mt="4" gap="2">
          <Skeleton className="rounded-full h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]" />
        </Flex>
      </Flex>
    </Flex>
    <Flex gap={{ initial: '2', sm: '4' }} className="flex-1 justify-around mt-4 sm:mt-0">
      {[0, 1, 2].map((col) => (
        <Flex direction="column" gap={{ initial: '2', sm: '4' }} key={col}>
          <Skeleton className="h-[20px] w-[60px] sm:h-[30px] sm:w-[100px]" />
          <Skeleton className="h-[20px] w-[60px] sm:h-[30px] sm:w-[100px]" />
          <Skeleton className="h-[20px] w-[60px] sm:h-[30px] sm:w-[100px]" />
        </Flex>
      ))}
    </Flex>
  </Flex>
)

export { LoadingPlaceholder }

