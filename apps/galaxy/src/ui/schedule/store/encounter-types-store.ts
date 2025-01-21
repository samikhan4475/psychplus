import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Encounter } from '@/types'
import { getVisitEncounterTypesAction } from '../client-actions'

interface Store {
  visitMediumOptionsMapper: { [key: string]: string[] }
  visitSequenceOptionsMapper: { [key: string]: string[] }
  loading: boolean
  fetchVisitEncounterTypes: () => void
}

const useEncounterTypeStore = create<Store>((set) => ({
  visitSequenceOptionsMapper: {},
  visitMediumOptionsMapper: {},
  loading: false,
  fetchVisitEncounterTypes: async () => {
    set({
      loading: true,
    })

    const result = await getVisitEncounterTypesAction()
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to retrieve Encounter Types')
      return set({
        loading: false,
      })
    }
    const transformedData = transformVisitEncounterTypes(result.data)

    set({
      visitSequenceOptionsMapper: transformedData.visitSequenceOptionsMapper,
      visitMediumOptionsMapper: transformedData.visitMediumOptionsMapper,
      loading: false,
    })
  },
}))

function transformVisitEncounterTypes(data: Encounter[]) {
  const visitSequenceOptionsMapper: { [key: string]: string[] } = {}
  const visitMediumOptionsMapper: { [key: string]: string[] } = {}

  data.forEach((visitType) => {
    if (!visitSequenceOptionsMapper[visitType.typeOfVisit]) {
      visitSequenceOptionsMapper[visitType.typeOfVisit] = []
    }
    if (
      !visitSequenceOptionsMapper[visitType.typeOfVisit].includes(
        visitType.visitSequence,
      )
    )
      visitSequenceOptionsMapper[visitType.typeOfVisit].push(
        visitType.visitSequence,
      )
    if (!visitMediumOptionsMapper[visitType.typeOfVisit]) {
      visitMediumOptionsMapper[visitType.typeOfVisit] = []
    }
    if (
      !visitMediumOptionsMapper[visitType.typeOfVisit].includes(
        visitType.visitMedium,
      )
    )
      visitMediumOptionsMapper[visitType.typeOfVisit].push(
        visitType.visitMedium,
      )
  })

  return {
    visitSequenceOptionsMapper,
    visitMediumOptionsMapper,
  }
}

export { useEncounterTypeStore }
