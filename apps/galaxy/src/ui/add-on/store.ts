import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getAddOnDrugs } from './add-on-widget/actions/get-add-on-drugs'

interface DrugItem {
  name: string
  genericName: string
  type: string
  manufacturer: string[]
  doses: string[]
  label?: string
  value?: string
}

interface DrugListItem {
  label: string
  value: string
}

interface Store {
  loading: boolean
  drugsData: DrugListItem[]
  fetchDrugs: (value: string, selectedDrug?: string) => void
  selectedDrug: DrugItem | null
  setSelectedDrug: (item: DrugListItem) => void
}

const useStore = create<Store>((set, get) => ({
  loading: false,
  drugsData: [],
  fetchDrugs: async (value, selectedDrug) => {
    set({ drugsData: [], loading: true })
    const response = await getAddOnDrugs(value)
    if (response.state === 'error') {
      toast.error('Failed to fetch drugs data')
      set({ loading: false })
      return
    }

    const list = response.data.map((drug: DrugItem) => {
      return {
        ...drug,
        label: `${drug.name} (${drug.genericName}) ${drug.type}`,
        value: `${drug.name} (${drug.genericName}) ${drug.type}`,
      }
    })

    if (selectedDrug) {
      const selectedDrugItem = list.find((drug) =>
        drug.value.toLowerCase().includes(selectedDrug.toLowerCase()),
      )
      set({ selectedDrug: selectedDrugItem })
    }

    set({ drugsData: list, loading: false })
  },
  selectedDrug: null,
  setSelectedDrug: (item) => {
    const { drugsData } = get()
    const selectedDrug = drugsData.find((drug) =>
      drug.value.toLowerCase().includes(item.value?.toLowerCase()),
    ) as DrugItem | null
    set({ selectedDrug })
  },
}))

export { useStore }
