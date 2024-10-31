const amountRegex = /^\d{0,3}(\.\d{0,2})?$/
const specialKeys = ['Backspace', 'Tab', 'Control', 'Shift', 'Alt']
const amountCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const newValue = e.currentTarget.value + e.key
  if (specialKeys.includes(e.key)) return
  if (!amountRegex.test(newValue)) return e.preventDefault()
}

export { amountCheck }
