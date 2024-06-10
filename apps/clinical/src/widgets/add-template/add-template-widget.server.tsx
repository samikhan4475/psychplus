import { getReportCategories } from '@psychplus/codeset/api.server'
import { AddTemplateWidgetClient } from './add-template-widget.client'
import { Preloader } from '@psychplus/reports/preloader'
import { useStore } from '@psychplus/reports/store'
import { getParameterTypeCodesets } from '@psychplus/reports/api.server'

const AddTemplateWidgetServer = async () => {
  const [ reportCategories, parameterCodeSets] = await Promise.all([
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
      <AddTemplateWidgetClient />
    </>
  )
}

export { AddTemplateWidgetServer }
