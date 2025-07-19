import { Text } from '@radix-ui/themes'
import { getConfiguration } from '@/api'
import { AccountSecurityView } from '@/features/account/security'

const AccountSecurityPage = async () => {
  const configurationResponse = await getConfiguration()
  if (configurationResponse.state === 'error') {
    return <Text>Error: {configurationResponse.error}</Text>
  }

  return <AccountSecurityView configuration={configurationResponse.data} />
}

export default AccountSecurityPage
