const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const formatCurrency = (value?: number) => {
  if (!value) return '$0.00'
  return USDollar.format(value)
}

const formatValueWithDecimals = (value?: string | number) => {
  const parsedValue =
    typeof value === 'number' ? value : parseFloat(value ?? '0')
  return parsedValue.toFixed(2)
}
export { formatCurrency, formatValueWithDecimals }
