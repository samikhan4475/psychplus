'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ZodError, ZodSchema } from 'zod'
import { getActiveCodeSets } from '@psychplus/codeset/api.client'
import { usePubsub } from '@psychplus/utils/event'
import {
  EVENT_ACTIVE_CODSET_CREATED,
  EVENT_ACTIVE_CODSET_DELETED,
} from '@psychplus/widgets/events'
import { useStore, ValidationError } from './store'
import { createActiveCodeRequestParams } from './utils'

const useActiveCodeAttributeDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleDialog = useCallback(() => {
    setIsDialogOpen((prevState) => !prevState)
  }, [])

  return { isDialogOpen, toggleDialog }
}
const useNewCode = () => {
  const { updateField } = useStore((state) => ({
    updateField: state.updateField,
  }))

  const handleFieldChange = useCallback(
    (type: 'newCode' | 'editableCode', key: string, value: string | number) => {
      updateField(type, key, value)
    },
    [updateField],
  )

  return {
    handleFieldChange,
  }
}

const useNewAttribute = () => {
  const { updateField } = useStore((state) => ({
    updateField: state.updateField,
  }))

  const handleFieldChange = useCallback(
    (
      type: 'newAttribute' | 'editableAttribute',
      key: string,
      value: string | number,
    ) => {
      updateField(type, key, value)
    },
    [updateField],
  )

  return {
    handleFieldChange,
  }
}

const useValidation = <T>(
  schema: ZodSchema<T>,
  setErrors: (errors: ValidationError) => void,
  errors: ValidationError,
) => {
  const validate = (data: T) => {
    try {
      schema.parse(data)
      setErrors({})
      return true
    } catch (e) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.reduce<ValidationError>((acc, err) => {
          acc[err.path[0]] = err.message
          return acc
        }, {})
        setErrors(errorMessages)
      }
      return false
    }
  }
  return { errors, validate }
}

const useRefetchActiveCodeSets = () => {
  const { subscribe } = usePubsub()

  const { setCodeSets, namespace, authorityId } = useStore((state) => ({
    setCodeSets: state.setCodeSets,
    namespace: state.namespace,
    authorityId: state.authorityId,
  }))

  const refetch = useMemo(
    () => () => {
      getActiveCodeSets(
        createActiveCodeRequestParams({ namespace, authorityId }),
      )
        .then((data) => {
          if (data.length) {
            const { codesets = [] } = data[0] || {}
            setCodeSets(codesets)
          }
        })
        .catch((err) => alert(err.message))
    },
    [setCodeSets],
  )

  useEffect(() => {
    return subscribe(EVENT_ACTIVE_CODSET_CREATED, refetch)
  }, [refetch, subscribe])

  useEffect(() => {
    return subscribe(EVENT_ACTIVE_CODSET_DELETED, refetch)
  }, [refetch, subscribe])
}

export {
  useActiveCodeAttributeDialog,
  useNewCode,
  useValidation,
  useRefetchActiveCodeSets,
  useNewAttribute,
}
