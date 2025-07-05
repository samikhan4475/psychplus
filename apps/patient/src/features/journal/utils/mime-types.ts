// Helper function to get file extension from MIME type or filename
export const getFileExtension = (fileName: string, mimeType: string): string => {
  // First try to get extension from filename
  const fileNameParts = fileName.split('.')
  if (fileNameParts.length > 1) {
    const existingExtension = fileNameParts[fileNameParts.length - 1].toLowerCase()
    if (isValidExtension(existingExtension)) {
      return `.${existingExtension}`
    }
  }
  
  // If no valid extension in filename, derive from MIME type
  const mimeToExtension: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'text/html': '.html',
    'text/css': '.css',
    'text/javascript': '.js',
    'application/json': '.json',
    'application/xml': '.xml',
    'application/zip': '.zip',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
    'audio/mpeg': '.mp3',
    'audio/wav': '.wav',
    'video/mp4': '.mp4',
    'video/avi': '.avi',
    'video/quicktime': '.mov',
  }
  
  return mimeToExtension[mimeType] || '.bin'
}

// Helper function to validate if an extension is valid
export const isValidExtension = (extension: string): boolean => {
  const validExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf', 'txt', 'html', 'css', 'js', 'json', 'xml', 'zip',
    'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'mp3', 'wav', 'mp4', 'avi', 'mov'
  ]
  return validExtensions.includes(extension.toLowerCase())
} 