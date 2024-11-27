import * as api from '@/api'

const generateSubRows = (
  testPanel: string,
  quantity: string,
  dates: string[],
) => {
  return dates.map((date, index) => ({
    id: `${index + 1}`,
    testPanel,
    quantity,
    date,
  }))
}

const generateMainRow = (
  id: string,
  testPanel: string,
  quantity: string,
  date: string,
  subRowsData: { testPanel: string; quantity: string; dates: string[] },
) => ({
  id,
  testPanel,
  quantity,
  date,
  subRows: generateSubRows(
    subRowsData.testPanel,
    subRowsData.quantity,
    subRowsData.dates,
  ),
})

const mockFetchLabResults = async (): Promise<api.NetworkResult<any[]>> => {
  //TODO: replace any with proper type once data schema is decided on the backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          generateMainRow('1', 'WBC', '6,500 cells/μL', '01/20/24 00:00', {
            testPanel: 'HDL Cholostrol',
            quantity: '6,300 cells/μL',
            dates: [
              '01/21/24 00:00',
              '01/22/24 00:00',
              '01/23/24 00:00',
              '02/20/24 00:00',
            ],
          }),
          generateMainRow('1', 'CALCIUM', '6,500 cells/μL', '01/22/24 00:00', {
            testPanel: 'HDL Cholostrol',
            quantity: '6,500 cells/μL',
            dates: ['02/20/24 00:00', '03/23/24 00:00', '04/23/24 00:00'],
          }),
          generateMainRow('1', 'GLUCOSE', '6,500 cells/μL', '01/23/24 00:00', {
            testPanel: 'HDL Cholostrol',
            quantity: '6,500 cells/μL',
            dates: ['01/20/24 00:00', '02/23/24 00:00', '03/23/24 00:00'],
          }),
          generateMainRow('1', 'THYROID', '6,500 cells/μL', '01/24/24 00:00', {
            testPanel: 'HDL Cholostrol',
            quantity: '6,500 cells/μL',
            dates: ['01/20/24 00:00', '02/23/24 00:00', '03/23/24 00:00'],
          }),
          generateMainRow('1', 'MOOCYTES', '6,500 cells/μL', '01/25/24 00:00', {
            testPanel: 'HDL Cholostrol',
            quantity: '6,500 cells/μL',
            dates: ['01/20/24 00:00', '02/23/24 00:00', '03/23/24 00:00'],
          }),
          generateMainRow('1', 'COCAIN', '6,500 cells/μL', '01/26/24 00:00', {
            testPanel: 'HDL Cholostrol',
            quantity: '6,500 cells/μL',
            dates: ['01/20/24 00:00', '02/23/24 00:00', '03/23/24 00:00'],
          }),
          generateMainRow('2', 'LIPID', '6,500 cells/μL', '01/27/24 00:00', {
            testPanel: 'HDL Cholostrol',
            quantity: '6,500 cells/μL',
            dates: [
              '01/21/24 00:00',
              '02/23/24 00:00',
              '03/23/24 00:00',
              '04/23/24 00:00',
            ],
          }),
        ],
      })
    }, 2000)
  })
}

const getLabResultsAction = async (): Promise<api.ActionResult<any>> => {
  const response = await mockFetchLabResults()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      labReports: response.data,
    },
  }
}

export { getLabResultsAction }
