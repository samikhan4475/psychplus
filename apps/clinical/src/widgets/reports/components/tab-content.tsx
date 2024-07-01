import { Button, Flex } from '@radix-ui/themes'

const TabContent = ({ title }: { title: string }) => {
  return (
      <Flex justify="between">
        {title}
        <Button>Add</Button>
      </Flex>
  )
}

export { TabContent }
