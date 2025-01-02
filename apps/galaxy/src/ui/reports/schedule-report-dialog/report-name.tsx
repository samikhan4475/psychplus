import { Text } from '@radix-ui/themes'
import { useStore } from '../store'

const ReportName = () => {
  const { selectedTemplate } = useStore()
  return (
    <Text className="text-pp-black-3 my-1" size="1">
      Show data for{' '}
      <Text weight="medium">
        &quot;{selectedTemplate?.displayName ?? ''}&quot;
      </Text>
    </Text>
  )
}

export default ReportName
