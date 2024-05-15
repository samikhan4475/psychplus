import { CODESETS } from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import { CodesetSelect } from '@/components-v2'
import { useStore } from '@/features/appointments/search/store'
import { FilterFieldLabel } from './filter-field-label'

const ProviderLanguageFilter = () => {
  const { language, setLanguage } = useStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage,
  }))

  return (
    <Flex direction="column" gap="1" className="flex-1">
      <FilterFieldLabel>Language</FilterFieldLabel>
      <CodesetSelect
        size={{ initial: '2' }}
        codeset={CODESETS.Language}
        value={language}
        onChange={setLanguage}
        placeholder="Select language"
      />
    </Flex>
  )
}

export { ProviderLanguageFilter }
