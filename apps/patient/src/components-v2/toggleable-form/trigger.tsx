import { Box } from '@radix-ui/themes'
import { useToggleableFormContext } from './context'

const Trigger = ({ children }: React.PropsWithChildren) => {
  const { open, setOpen } = useToggleableFormContext()

  if (open) {
    return null
  }

  return (
    <Box
      className="w-full"
      onClick={() => {
        setOpen(true)
      }}
    >
      {children}
    </Box>
  )
}

export { Trigger }
