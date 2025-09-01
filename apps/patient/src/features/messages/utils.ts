import React from 'react'
import { BillingIcon, SchedulingIcon, TreatmentTeamIcon } from '@/components-v2'
import { getTimeAgo } from '../notifications/ui/utils'
import { ChatHeadTypes, ChatResponseTypes, Messages } from './types'

const getDateLabel = (_date: string) => {
  const date = new Date(_date)
  const currentDate = new Date().toISOString().split('T')[0]

  if (currentDate === _date) {
    return 'Today'
  }
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
}

function transformOut(response: ChatResponseTypes[]): ChatHeadTypes[] {
  return response.map((msg) => {
    const senderFullName =
      [
        msg.senderName.firstName,
        msg.senderName.middleName,
        msg.senderName.lastName,
      ]
        .filter(Boolean)
        .join(' ') || 'Unknown'

    const messagePreview =
      msg.text.length > 60 ? msg.text.substring(0, 57) + '...' : msg.text

    const firstChannel = msg.channels[0]

    let avatar: string | undefined
    if (!msg.isForTreatmentTeam) {
      avatar =
        msg.channels.length === 0 ? '' : msg.channels[0].externalMessageId
    } else {
      avatar = undefined
    }

    return {
      id: msg.id,
      name: msg.isForTreatmentTeam ? 'Treatment Team' : senderFullName,
      role: msg.senderUserRole ?? '',
      message: messagePreview,
      time: getTimeAgo(new Date(msg.sentOn)),
      isUnread: !(firstChannel?.isRead ?? true),
      groupId: msg.groupId,
      icon: msg.isForTreatmentTeam
        ? React.createElement(TreatmentTeamIcon, {
            width: '20',
            height: '20',
            fill: '#6E56CF',
          })
        : undefined,
      avatar,
      isOnline: false,
      isTeam: msg.isForTreatmentTeam,
      conversationId: msg.conversationId,
    }
  })
}

function transformOutThread(
  response: ChatResponseTypes[],
  currentUserId: number | string,
): Messages[] {
  return response.map((msg) => {
    const senderFullName =
      [
        msg.senderName.firstName,
        msg.senderName.middleName,
        msg.senderName.lastName,
      ]
        .filter(Boolean)
        .join(' ') || 'Unknown'

    return {
      id: msg.id,
      name: msg.senderUserId === currentUserId ? 'You' : senderFullName,
      message: msg.text,
      date: msg.sentOn,
      isMine: msg.senderUserId === currentUserId,
      attachments: msg.attachments ?? [],
    }
  })
}

const getPlainText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

const renderTeamIcon = (selectedTeam: string) => {
  if (selectedTeam === 'treatment') {
    return React.createElement(TreatmentTeamIcon, {
      width: '20',
      height: '20',
      fill: '#6E56CF',
    })
  }

  if (selectedTeam === 'scheduling') {
    return React.createElement(SchedulingIcon, {
      width: '20',
      height: '20',
      fill: '#F2AE40',
    })
  }

  return React.createElement(BillingIcon, {
    width: '20',
    height: '20',
    fill: '#0B68CB',
  })
}

export {
  getDateLabel,
  transformOut,
  getPlainText,
  renderTeamIcon,
  transformOutThread,
}
