interface NativeInputEvent
  extends React.BaseSyntheticEvent<Event, EventTarget & HTMLInputElement> {
  inputType: string
  data: string
}

interface PropsWithTestId {
  'data-testid': string
}

interface IconProps {
  width?: string | number
  height?: string | number
  onClick?: () => void
  className?: string
}

export type { NativeInputEvent, PropsWithTestId, IconProps }
