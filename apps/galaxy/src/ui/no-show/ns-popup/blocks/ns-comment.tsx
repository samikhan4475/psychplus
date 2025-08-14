import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { NoShowFormSchema } from '../schema'

export const CommentSection = () => {
  const { register } = useFormContext<NoShowFormSchema>()
  return (
    <Flex className=" flex-col border border-slate-3">
      <Flex className="bg-pp-bg-accent flex w-full flex-1 cursor-pointer items-center justify-between rounded-1 p-1 px-3">
        <Flex>
          <Text size="2" weight="medium">
            Comments
          </Text>
        </Flex>
      </Flex>
      <input
        {...register('comments')}
        style={{ fontSize: 12 }}
        className=" mx-3 my-1 h-7 border border-slate-4 px-2 focus:outline-none focus:ring-0  "
        placeholder="Add Comments here"
      />
    </Flex>
  )
}
