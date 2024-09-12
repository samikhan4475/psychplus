import { Button, Flex, Text } from '@radix-ui/themes'

const buttonClasses =
  'rounded-[20px] [box-shadow:inset_0_0_0_0.5px_#B9BBC6] text-xs px-2 text-pp-black-3 font-[400] cursor-pointer active:bg-pp-focus-bg active:text-pp-blue h-5'

const ColumnFilterGroup = () => {
  return (
    <Flex align="center" className="gap-x-1.5 pr-[9px] flex-1" justify='end'>
      <Button variant="outline" className={buttonClasses}>
        <Text weight={'regular'} size={'2'}>
          All
        </Text>
      </Button>
      <Button variant="outline" className={buttonClasses}>
        <Text weight={'regular'} size={'2'}>
          Intake
        </Text>
      </Button>
      <Button variant="outline" className={buttonClasses}>
        <Text weight={'regular'} size={'2'}>
          CSS
        </Text>
      </Button>
      <Button variant="outline" className={buttonClasses}>
        <Text weight={'regular'} size={'2'}>
          Rev Cycle
        </Text>
      </Button>
      <Button variant="outline" className={buttonClasses}>
        <Text weight={'regular'} size={'2'}>
          Provider
        </Text>
      </Button>
      <Button variant="outline" className={buttonClasses}>
        <Text weight={'regular'} size={'2'}>
          BA
        </Text>
      </Button>
    </Flex>
  )
}

export { ColumnFilterGroup }
