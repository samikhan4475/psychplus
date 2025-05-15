'use client'

import { ComponentProps } from 'react'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import { QuickNoteSectionItem } from '@/types'
import { useStore } from './store'
import { WidgetComponent } from './types'

type QuickNoteDataProviderProps = ComponentProps<WidgetComponent> & {
  id: string
  component: WidgetComponent
  widgetsData: QuickNoteSectionItem[]
}

const QuickNoteDataProvider = ({
  id,
  component: Component,
  data: initialData = [],
  widgetsData,
  ...props
}: QuickNoteDataProviderProps) => {
  const widgetData = useStore((state) => state.widgetsData?.[id] || initialData)

  const componentData = useDeepCompareMemo(() => {
    return widgetData ?? initialData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetData])
  return <Component {...props} data={componentData} widgetsData={widgetsData} />
}

export { QuickNoteDataProvider }
