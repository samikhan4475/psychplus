import { useStore } from '../../store'

const useAddCreditCard = () =>
  useStore((state) => ({
    isDialogOpen: state.addCreditCardDialogOpen,
    setIsDialogOpen: state.setAddCreditCardDialogOpen,
    openDialog: () => {
      state.setAddCreditCardDialogOpen(true)
    },
    closeDialog: () => {
      state.setAddCreditCardDialogOpen(false)
    },
  }))

export { useAddCreditCard }
