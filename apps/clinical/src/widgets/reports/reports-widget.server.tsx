import { unstable_noStore as noStore } from 'next/cache'
import { Preloader } from './preloader'
import { useStore } from './store'
import { ReportsWidgetClient } from './reports-widget.client'
import { getCodeSets, getReportCategories } from '@psychplus/codeset/api.server'
import { getParameterTypeCodesets, searchTemplates } from '@psychplus/reports/api.server'


const ReportsWidgetServer = async () => {
  noStore()

  const [codeSets, reportCategories, reportTemplates, parameterCodeSets] = await Promise.all([
    getCodeSets(),
    getReportCategories(),
    searchTemplates(),
    getParameterTypeCodesets(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        reportCategories={reportCategories}
        reportTemplates={ reportTemplates }
        parameterCodeSets = {parameterCodeSets.codes}
      />
      <ReportsWidgetClient />
    </>
  )
}

export { ReportsWidgetServer }
