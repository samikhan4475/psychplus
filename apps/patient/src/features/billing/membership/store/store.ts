import { create } from 'zustand'

type MembershipStore = {
  isMembershipDialogOpen: boolean
  setIsMembershipDialogOpen: (isOpen: boolean) => void
}

const useStore = create<MembershipStore>((set) => ({
  isMembershipDialogOpen: false,
  setIsMembershipDialogOpen: (isOpen: boolean) => {
    set({ isMembershipDialogOpen: isOpen })
  },
}))

export { useStore }
