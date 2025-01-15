'use client'

import { ComponentProps, useMemo } from 'react'
import { useStore } from './store'
import { WidgetComponent } from './types'

type QuickNoteDataProviderProps = ComponentProps<WidgetComponent> & {
  id: string
  component: WidgetComponent
}
const QuickNoteDataProvider = ({
  id,
  component: Component,
  data: intialData = [],
  ...props
}: QuickNoteDataProviderProps) => {
  const data = useStore((state) => state?.widgetsData)

  const componentData = useMemo(() => {
    return data?.[id] ?? intialData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.[id]])

  return <Component {...props} data={componentData} />
}

export { QuickNoteDataProvider }
