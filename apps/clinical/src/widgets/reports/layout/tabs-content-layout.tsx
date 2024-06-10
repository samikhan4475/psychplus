import { Box } from '@radix-ui/themes'

const TabsContentLayout = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <Box className="col-span-4 z-0">
      {children}
    </Box>
  )
}

export { TabsContentLayout }
