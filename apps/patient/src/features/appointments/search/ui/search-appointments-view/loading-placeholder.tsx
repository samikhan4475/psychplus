import { Flex, Skeleton } from '@radix-ui/themes'

interface LoadingPlaceholderProps {
  showFilters?: boolean
}

const LoadingPlaceholder = ({ showFilters }: LoadingPlaceholderProps) => (
  <Flex direction="column" width="100%" className="bg-white">
    {showFilters ? <FiltersPlaceholder /> : null}
    <BannerPlaceholder />
    <Flex direction="column">
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
      <AppointmentPlaceholder />
    </Flex>
  </Flex>
)

const FiltersPlaceholder = () => (
  <Flex justify="between" py="5" px="5" gap="6">
    <Flex gap="4">
      <Skeleton className="h-[50px] w-[150px]" />
      <Skeleton className="h-[50px] w-[150px]" />
    </Flex>
    <Flex gap="4">
      <Skeleton className="h-[45px] w-[95px]" />
      <Skeleton className="h-[45px] w-[95px]" />
      <Skeleton className="h-[45px] w-[95px]" />
      <Skeleton className="h-[45px] w-[95px]" />
    </Flex>
  </Flex>
)

const BannerPlaceholder = () => (
  <Flex
    align="center"
    justify="between"
    py="5"
    px="5"
    className="border-y border-y-gray-5"
  >
    <Skeleton className="h-[40px] w-[125px]" />
    <Flex gap="6" justify="center" className="flex-1">
      <Skeleton className="h-[30px] w-[75px]" />
      <Skeleton className="h-[30px] w-[75px]" />
      <Skeleton className="h-[30px] w-[75px]" />
      <Skeleton className="h-[30px] w-[75px]" />
      <Skeleton className="h-[30px] w-[75px]" />
      <Skeleton className="h-[30px] w-[75px]" />
      <Skeleton className="h-[30px] w-[75px]" />
    </Flex>
  </Flex>
)

const AppointmentPlaceholder = () => (
  <Flex py="5" px="5" className="border-b border-b-gray-5">
    <Flex gap="4">
      <Skeleton className="rounded-full h-[100px] w-[100px]" />
      <Flex direction="column">
        <Skeleton mt="2" className="h-[25px] w-[150px]" />
        <Skeleton mt="2" className="h-[15px] w-[100px]" />
        <Skeleton mt="2" className="h-[40px] w-[150px]" />
        <Flex mt="4" gap="2">
          <Skeleton className="rounded-full h-[30px] w-[30px]" />
        </Flex>
      </Flex>
    </Flex>
    <Flex gap="4" className="flex-1 justify-around">
      <Flex direction="column" gap="4">
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
      </Flex>
      <Flex direction="column" gap="4">
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
      </Flex>
      <Flex direction="column" gap="4">
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
      </Flex>
    </Flex>
  </Flex>
)

export { LoadingPlaceholder }
