import { useStore } from '../../store'

const useAddClaimStatus = () =>
  useStore((state) => ({
    isDialogOpen: state.addClaimStatusDialogOpen,
    setIsDialogOpen: state.setAddClaimStatusDialogOpen,
    openDialog: () => {
      state.setAddClaimStatusDialogOpen(true)
    },
    closeDialog: () => {
      state.setAddClaimStatusDialogOpen(false)
    },
  }))

export { useAddClaimStatus }
