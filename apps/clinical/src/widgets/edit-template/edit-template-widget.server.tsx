import { getReportCategories } from '@psychplus/codeset/api.server'
import { Preloader } from '@psychplus/reports/preloader'
import { useStore } from '@psychplus/reports/store'
import { EditTemplateWidgetClient } from './edit-template-widget.client'
import { getParameterTypeCodesets } from '@psychplus/reports/api.server'

const EditTemplateWidgetServer = async () => {
  const [reportCategories, parameterCodeSets] = await Promise.all([
    getReportCategories(),
    getParameterTypeCodesets(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        reportCategories={reportCategories}
        parameterCodeSets = {parameterCodeSets.codes}
      />
      <EditTemplateWidgetClient />
    </>
  )
}

export { EditTemplateWidgetServer }
