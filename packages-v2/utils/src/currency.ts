const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const formatCurrency = (value: number) => USDollar.format(value)

export { formatCurrency }
