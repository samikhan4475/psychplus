import { Flex } from '@radix-ui/themes'

const RelationshipBlockHeader = () => {
  return (
    <Flex width="100%" className="bg-pp-focus-bg-2">
      {titles.map((title, idx) => (
        <Flex
          className="border-pp-table-border text-pp-black-3 w-full flex-1 justify-start border-b border-r px-1 text-1 font-medium last:!border-r-0"
          key={`${title}-${idx}`}
        >
          {title}
        </Flex>
      ))}
    </Flex>
  )
}

const titles = [
  'Emergency Contact',
  'RRI (Request to Release Information)',
  'Guardian',
]
export { RelationshipBlockHeader }
