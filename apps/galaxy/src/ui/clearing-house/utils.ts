interface Code {
  display: string
  value: string
}

const getStateDisplayName = (codes: Code[], state: string) => {
  return codes.find((element) => element.value === state)?.display
}

export { getStateDisplayName }
