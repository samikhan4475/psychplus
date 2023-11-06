import * as React from 'react'

interface NativeInputEvent
  extends React.BaseSyntheticEvent<Event, EventTarget & HTMLInputElement> {
  inputType: string
  data: string
}

interface PropsWithTestId {
  'data-testid': string
}

export type { NativeInputEvent, PropsWithTestId }
