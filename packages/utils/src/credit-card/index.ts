export const getCreditCardType = (cardNumber: string) => {
  // Define regular expressions for different card types
  const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/
  const mastercardRegEx = /^5[1-5][0-9]{14}$/
  const amexRegEx = /^3[47][0-9]{13}$/
  const discoverRegEx = /^6(?:011|5[0-9]{2})[0-9]{12}$/

  // Check for each card type and return the result
  if (visaRegEx.test(cardNumber)) {
    return 'Visa'
  } else if (mastercardRegEx.test(cardNumber)) {
    return 'Mastercard'
  } else if (amexRegEx.test(cardNumber)) {
    return 'AmericanExpress'
  } else if (discoverRegEx.test(cardNumber)) {
    return 'Discover'
  } else {
    return 'Unknown'
  }
}
