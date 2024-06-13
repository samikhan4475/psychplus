import { unstable_noStore as noStore } from 'next/cache'
import { Box } from '@radix-ui/themes'
import { getRealCodeSets } from '@psychplus/codeset/api.server'
import { getImmunizations } from '@psychplus/immunization/api.server'
import { ImmunizationListWidgetClient } from './immunization-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'
import { requestBody } from './types'

const ImmunizationListWidgetServer = async ({
  appointmentId,
}: {
  appointmentId: number
}) => {
  noStore()

  let codeSets, immunizations

  try {
    [codeSets, immunizations] = await Promise.all([
      getRealCodeSets(requestBody),
      getImmunizations(appointmentId),
    ])
  } catch (err) {
    console.error('Error fetching data:', err)
  }

  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        immunizations={immunizations}
        appointmentId={appointmentId}
      />
      <ImmunizationListWidgetClient />
    </>
  )
}

export { ImmunizationListWidgetServer }
