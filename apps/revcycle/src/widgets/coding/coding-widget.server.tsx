import { unstable_noStore as noStore } from 'next/cache'
import { getCPTCategCodeSets, getPOSCodeSets } from '../coding-cpt/api.server'
import { CodingWidgetClient } from './coding-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const CodingWidgetServer = async () => {
  noStore()
  const posCodeSets = await getPOSCodeSets()
  const cptCategoryCodeSets = await getCPTCategCodeSets()
  return (
    <>
      <Preloader store={useStore} posCodeSets={posCodeSets} cptCategoryCodeSets={cptCategoryCodeSets}/>
      <CodingWidgetClient />
    </>
  )
}

export { CodingWidgetServer }
