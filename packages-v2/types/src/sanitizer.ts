type Primitive = string | number | boolean | symbol | bigint

type SanitizableValue =
  | Primitive
  | null
  | undefined
  | SanitizableValue[]
  | { [key: string]: SanitizableValue }
export type { SanitizableValue, Primitive }
