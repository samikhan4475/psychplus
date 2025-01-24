'use server'


interface StatusHistory {
  status: string
  username: string
  date: string
}

const mockData: StatusHistory[] = [
  { status: 'Pending', username: 'John Doe', date: '2021/10/10 00:00' },
  { status: 'Pending', username: 'Jahn Doe', date: '2021/10/10 00:00' },
  { status: 'Pending', username: 'John Doe', date: '2021/10/10 00:00' },
]

const getClinicStatusHistoryList = async (
): Promise<StatusHistory[]> => new Promise((resolve) => setTimeout(() => resolve(mockData),500)) 

export { getClinicStatusHistoryList }