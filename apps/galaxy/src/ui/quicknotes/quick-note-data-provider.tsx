'use client'

import { ComponentProps } from 'react'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import { useStore } from './store'
import { WidgetComponent } from './types'

type QuickNoteDataProviderProps = ComponentProps<WidgetComponent> & {
  id: string
  component: WidgetComponent
}

const QuickNoteDataProvider = ({
  id,
  component: Component,
  data: initialData = [],
  ...props
}: QuickNoteDataProviderProps) => {
  const widgetData = useStore((state) => state.widgetsData?.[id] || initialData)

  const componentData = useDeepCompareMemo(() => {
    return widgetData ?? initialData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetData])
  return <Component {...props} data={componentData} />
}

export { QuickNoteDataProvider }
