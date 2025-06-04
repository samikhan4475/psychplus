import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ProviderTable } from './provider-table'
import { useStore } from './store'

const ProviderView = ({
  isPrimary = true,
  providerType,
  loadingProviderType,
}: {
  isPrimary: boolean
  providerType: string
  loadingProviderType: boolean
}) => {
  const { id } = useParams<{ id: string }>()
  const { fetchPatientsOfProvider, loadingPrimaryProviders } = useStore(
    (state) => ({
      fetchPatientsOfProvider: state.fetchPatientsOfProvider,
      loadingPrimaryProviders: state.loadingPrimaryProviders,
    }),
  )

  useEffect(() => {
    if (!providerType || loadingProviderType) return
    fetchPatientsOfProvider(+id, isPrimary, providerType)
  }, [id, providerType, loadingProviderType])

  return (
    <Flex direction="column" width="100%" gap="1">
      <ProviderHeader isPrimary={isPrimary} />
      {loadingPrimaryProviders ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <ProviderTable
          isPrimary={isPrimary}
          providerType={providerType}
          staffId={id}
        />
      )}
    </Flex>
  )
}

const ProviderHeader = ({ isPrimary = true }: { isPrimary: boolean }) => {
  const heading = isPrimary ? 'Primary Provider' : 'Secondary Provider'

  return (
    <Flex direction="column" gap="1" className="bg-pp-bg-accent">
      <Flex className="bg-white" p="2">
        <Text size="4" weight="medium">
          {heading}
        </Text>
      </Flex>
    </Flex>
  )
}

export { ProviderView }
