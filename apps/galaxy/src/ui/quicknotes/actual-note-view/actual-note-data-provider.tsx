'use client'

import { ComponentProps } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import { QuickNoteSectionName } from '../constants'
import { useStore } from '../store'
import { WidgetComponent } from '../types'

type ActualNoteDataProviderProps = ComponentProps<WidgetComponent> & {
  id: QuickNoteSectionName
  component: WidgetComponent
}

const ActualNoteDataProvider = ({
  id,
  component: Component,
  data: initialData = [],
  ...props
}: ActualNoteDataProviderProps) => {
  const widgetData = useStore(
    useShallow((state) => state.actualNotewidgetsData?.[id] || initialData),
  )
  const componentData = useDeepCompareMemo(() => {
    return widgetData ?? initialData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetData])
  return <Component {...props} data={componentData} />
}

export { ActualNoteDataProvider }
