import { Text } from '@radix-ui/themes'

const BlockDescription = ({ children }: React.PropsWithChildren) => {
  return (
    <Text
      size="1"
      className="flex min-h-[var(--chip-height)] items-center break-all"
    >
      {children}
    </Text>
  )
}

export { BlockDescription }
