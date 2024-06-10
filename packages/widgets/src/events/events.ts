const EVENT_REFERRAL_CREATED = 'referral-created'
const EVENT_REFERRAL_EDITED = 'referral-edited'
const EVENT_TEMPLATE_CREATED = 'template-created'
const EVENT_TEMPLATE_EDITED = 'template-edited'

enum EventType {
  Loaded = 'loaded',
  Error = 'error',
  Opened = 'opened',
  Closed = 'closed',
  Size = 'size',
  ClosePopover = 'close-popover',
}

export { EventType, EVENT_REFERRAL_CREATED, EVENT_REFERRAL_EDITED, EVENT_TEMPLATE_CREATED, EVENT_TEMPLATE_EDITED }
