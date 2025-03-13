const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
const decodeUrlString = (str: string) => decodeURIComponent(str)

const truncateString = (str: string, length: number) =>
  str.length > length ? `${str.slice(0, length)}...` : str

function formatReadableString(input: string): string {
  return input.replace(/([A-Z])/g, ' $1').trim()
}

const capitalizeName = (name: string) => {
  const nameParts = name.split(' ')
  nameParts.forEach((part, index) => {
    nameParts[index] = capitalizeFirstLetter(part)
  })
  return nameParts.join(' ')
}

function encodeTextToHtml(text: string) {
  return text
    ?.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&emsp;')
}

function decodeHtmlToText(html: string) {
  return html
    ?.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|h[1-6]|tr|blockquote|pre)>/gi, '\n')
    .replace(/<\/(li|dt|dd)>/gi, '\n')
    .replace(/<\/(td|th)>/gi, '\t')
    .replace(/<\/ul>|<\/ol>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<div>\s*/gi, '\n')
    .replace(/<\/div>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .trim()
}

export {
  decodeUrlString,
  truncateString,
  capitalizeFirstLetter,
  formatReadableString,
  capitalizeName,
  decodeHtmlToText,
  encodeTextToHtml,
}
