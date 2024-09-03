import { createContext, Dispatch, SetStateAction, useContext } from "react"

interface ContextType {
    selectedRow: string | undefined
    setSelectedRow: Dispatch<SetStateAction<string | undefined>>
}

const RowSelectionContext = createContext<ContextType | undefined>(undefined)

const useRowSelectionContext = ():ContextType => {
    const context = useContext(RowSelectionContext)
    if (!context) {
        throw Error('useRowSelectionContext must be called inside the RowSelectionContext provider')
    }
    return context
}

export { RowSelectionContext, useRowSelectionContext}