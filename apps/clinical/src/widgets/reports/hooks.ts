import { useEffect, useMemo } from 'react'
import { usePubsub } from '@psychplus/utils/event'
import { EVENT_TEMPLATE_CREATED, EVENT_TEMPLATE_EDITED } from '@psychplus/widgets/events'
import { searchTemplates } from '@psychplus/reports/api.client'
import { useStore } from './store'

const useRefetchTemplates = () => {
  const { subscribe } = usePubsub()
  const setTemplates = useStore((state) => state.setReportTemplates)
  const refetch = useMemo(
    () => () => {
      searchTemplates()
        .then(setTemplates)
        .catch((err) => alert(err.message))
    },
    [setTemplates],
  )
  useEffect(() => {
    return subscribe(EVENT_TEMPLATE_CREATED, refetch)
  }, [refetch, subscribe])

  useEffect(() => {
    return subscribe(EVENT_TEMPLATE_EDITED, refetch)
  }, [refetch, subscribe])
}

export { useRefetchTemplates }
