import { Button, Flex } from '@radix-ui/themes'

const buttonClasses =
  'rounded-[20px] [box-shadow:inset_0_0_0_0.5px_#B9BBC6] text-xs px-2 text-pp-black-3 font-[400] cursor-pointer active:bg-[#D9E2FC] active:text-[#194595] h-5'

const SchedulerFilterGroup = () => {
  return (
    <Flex align="center" className="gap-x-3 pr-[12px] flex-1" justify="end">
      <Button variant="outline" className={buttonClasses}>
        All
      </Button>
      <Button variant="outline" className={buttonClasses}>
        In-Person
      </Button>
      <Button variant="outline" className={buttonClasses}>
        Video
      </Button>
    </Flex>
  )
}

export { SchedulerFilterGroup }
