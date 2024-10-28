import { Box, Button, Dialog } from '@radix-ui/themes'

const FooterDialog = () => {
  return (
    <Box className="mt-4 flex justify-end">
      <Dialog.Close>
        <Button
          variant="outline"
          highContrast
          className="bg-white mr-2"
          size="2"
        >
          Cancel
        </Button>
      </Dialog.Close>
      <Button variant="outline" highContrast className="bg-white mr-2" size="2">
        View Statement
      </Button>
      <Button className="bg-pp-black-1" size="2">
        Submit
      </Button>
    </Box>
  )
}

export { FooterDialog }
