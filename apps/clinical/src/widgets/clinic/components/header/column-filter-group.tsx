import { Button, Flex } from '@radix-ui/themes'

const buttonClasses =
  'rounded-[20px] [box-shadow:inset_0_0_0_0.5px_#B9BBC6] text-xs px-2 text-[#1C2024] font-[400] cursor-pointer active:bg-[#D9E2FC] active:text-[#194595] h-5'

const ColumnFilterGroup = () => {
  return (
    <Flex align="center" className="gap-x-1.5 pr-[9px]">
      <Button variant="outline" className={buttonClasses}>
        All
      </Button>
      <Button variant="outline" className={buttonClasses}>
        Intake
      </Button>
      <Button variant="outline" className={buttonClasses}>
        CSS
      </Button>
      <Button variant="outline" className={buttonClasses}>
        Rev Cycle
      </Button>
      <Button variant="outline" className={buttonClasses}>
        Provider
      </Button>
      <Button variant="outline" className={buttonClasses}>
        BA
      </Button>
    </Flex>
  )
}

export { ColumnFilterGroup }
