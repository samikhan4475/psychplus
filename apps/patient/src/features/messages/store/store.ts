import { create } from 'zustand'
import { getChatsAction } from '../actions'
import { getMessagesAction } from '../actions/get-messages-action'
import { ChatHeadTypes, Messages } from '../types'
import { transformOut, transformOutThread } from '../utils'

interface Store {
  messages: Messages[]
  setMessages: (messages: Messages[]) => void
  chatHeads: ChatHeadTypes[]
  setChatHeads: (chatHeads: ChatHeadTypes[]) => void
  inboxId: string | number
  setInboxId: (inboxId: string) => void
  groupId: string | number
  setGroupId: (groupId: string | number) => void
  isInboxActive: boolean
  setIsInboxActive: (value: boolean) => void
  isNewChat: boolean
  setIsNewChat: (value: boolean) => void
  getChats: () => Promise<void>
  getMessages: (
    messageId: string | number,
    id: string | number,
  ) => Promise<void>
}

const useStore = create<Store>()((set, get) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  chatHeads: [],
  setChatHeads: (chatHeads) => set({ chatHeads }),
  inboxId: '',
  setInboxId: (inboxId) => set({ inboxId }),
  groupId: '',
  setGroupId: (groupId) => set({ groupId }),
  isInboxActive: true,
  setIsInboxActive: (value) => set({ isInboxActive: value }),
  isNewChat: true,
  setIsNewChat: (value) => set({ isNewChat: value }),
  getChats: async () => {
    const res = await getChatsAction()
    if (res.state === 'success') {
      const chatHeads = transformOut(res.data)
      set({ chatHeads: chatHeads })
    }
  },
  getMessages: async (messageId, id) => {
    const res = await getMessagesAction({ messageId })
    if (res.state === 'success') {
      const messages = transformOutThread(res.data, id)
      set({
        messages: messages,
        isInboxActive: false,
        inboxId: res.data?.[0]?.groupId
          ? res.data?.[0]?.groupId
          : messages[0].id,
        groupId: res.data?.[0].groupId ?? '',
        isNewChat: false,
      })
    }
  },
}))

export { useStore }
