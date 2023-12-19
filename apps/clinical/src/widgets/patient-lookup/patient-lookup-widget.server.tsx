import { unstable_noStore as noStore } from 'next/cache'
import { Flex } from '@radix-ui/themes'
import { CodeSetPreloader } from '@psychplus/codeset'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { FiltersContainer, PageHeader } from './components'
import { PatientLookupWidgetClient } from './patient-lookup-widget.client'
import { useStore } from './store'

const PatientLookupWidgetServer = async () => {
  noStore()

  const [codeSets] = await Promise.all([getCodeSets()])

  return (
    <>
      <CodeSetPreloader codeSets={codeSets} store={[useStore]} />
      <Flex p="5" direction="column">
        <PageHeader
          title="Patient Lookup"
          description={
            'Please choose any of the filter to search the patient(s).'
          }
        />
        <Flex gap="5">
          <FiltersContainer />
          <PatientLookupWidgetClient />
        </Flex>
      </Flex>
    </>
  )
}

export { PatientLookupWidgetServer }
