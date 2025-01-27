'use client'

import { ComponentProps, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
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
  const widgetData = useStore(
    useShallow((state) => state.widgetsData?.[id] || initialData),
  )
  const componentData = useMemo(() => {
    return widgetData ?? initialData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetData])

  return <Component {...props} data={componentData} />
}

export { QuickNoteDataProvider }
