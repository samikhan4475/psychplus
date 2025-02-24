import { Text } from '@radix-ui/themes'
import { AssigningAuthoritiesView } from '@/ui/assigning-authorities'
import { getAssigningAuthorities } from '@/ui/assigning-authorities/api'

const AssigningAuthoritiesPage = async () => {
  const assigningAuthoritiesResponse = await getAssigningAuthorities({
    isIncludeCodesets: false,
    isIncludeCodes: false,
    isIncludeCodeAttributes: false,
  })

  if (assigningAuthoritiesResponse.state === 'error') {
    return <Text>{assigningAuthoritiesResponse.error}</Text>
  }

  return (
    <AssigningAuthoritiesView
      assigningAuthorities={assigningAuthoritiesResponse.data ?? []}
    />
  )
}

export default AssigningAuthoritiesPage
