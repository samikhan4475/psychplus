'use server'

import { ForwardingMessage } from '../types';

const mockData:ForwardingMessage[] = [
    {
      staffName: 'Dr John Doe',
      type: 'Psychiatrist',
      role: 'MD',
      startDate: '2021/10/10 10:00',
      endDate: '2021/10/10 11:00',
      days: 20,
      tasks: ['Messaging', 'Notes'],
      statusWithUsers: {
        status:"pending",
        users:[
        { status: 'Pending', username: 'John Doe', date: '2021/10/10 00:00' },
        { status: 'Pending', username: 'Jahn Doe', date: '2021/10/10 00:00' },
        { status: 'Pending', username: 'John Doe', date: '2021/10/10 00:00' },
]},
    }
    
  ]

const getForwardingMessagesAction = async (): Promise<ForwardingMessage[]>=> new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockData)
  }, 500)
})

export { getForwardingMessagesAction }