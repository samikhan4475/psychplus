import { create } from 'zustand'

interface GroupSelectStore {
  checkAllNormal: boolean
  selectedValues: string[]
  setCheckAllNormal: (checked: boolean, normalOptions: string[]) => void
  toggleSelected: (value: string) => void
}

export const useGroupSelectStore = create<GroupSelectStore>((set) => ({
  checkAllNormal: false,
  selectedValues: [],
  setCheckAllNormal: (checked: boolean, normalOptions: string[]) => {
    set((state) => ({
      checkAllNormal: checked,
      selectedValues: checked
        ? [...state.selectedValues, ...normalOptions]
        : state.selectedValues.filter((v) => !normalOptions.includes(v)),
    }))
  },
  toggleSelected: (value: string) =>
    set((state) => ({
      selectedValues: state.selectedValues.includes(value)
        ? state.selectedValues.filter((v) => v !== value)
        : [...state.selectedValues, value],
    })),
}))
