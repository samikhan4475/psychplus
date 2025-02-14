const formatPolicyString = (input: string): string =>
  input.replace(/(Policy)(\w+)/, '$1 $2')

export { formatPolicyString }
