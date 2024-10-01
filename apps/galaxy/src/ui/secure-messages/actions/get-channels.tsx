import * as api from '@/api'
import { Channel } from '../types'

const getAllChannelsAgainstMessageIdAction = async (
  messageId: string,
): Promise<api.ActionResult<Channel[]>> => {
  const response = await mockAllChannelsAgainstMessageIdAction(messageId)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

const mockAllChannelsAgainstMessageIdAction = async (
  messageId: string,
): Promise<api.NetworkResult<Channel[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            metadata: {
              createdOn: '2024-09-27T13:19:52.806Z',
              createdBy: 0,
              createdByFullName: 'string',
              updatedOn: '2024-09-27T13:19:52.806Z',
              updatedBy: 0,
              updatedByFullName: 'string',
              deletedOn: '2024-09-27T13:19:52.806Z',
              deletedBy: 0,
              deletedByFullName: 'string',
            },
            recordStatus: 'Active',
            receiverUserId: 0,
            messageId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            receiverType: 'MAIN',
            receiverStatus: 'Dispatch',
            sendMode: 'Internal',
            receiverStatusDetail: 'string',
            externalMessageId: 'string',
            externalEmail: 'string',
            readTimeStamp: '2024-09-27T13:19:52.806Z',
            isRead: true,
            isReplied: true,
          },
        ],
      })
    }, 2000)
  })
}

export { getAllChannelsAgainstMessageIdAction }
