import { Dispatch, SetStateAction, createContext, useContext } from "react"

interface ContextType {
    onCollapse: Dispatch<SetStateAction<boolean>>
    isCollapsed: boolean
}

const SidebarContext = createContext<ContextType | undefined>(undefined)

const useSidebarContext = ():ContextType => {
    const context = useContext(SidebarContext)
    if(!context) {
        throw Error('useContext called outside a provider')
    }
    return context
}

export { SidebarContext, useSidebarContext}