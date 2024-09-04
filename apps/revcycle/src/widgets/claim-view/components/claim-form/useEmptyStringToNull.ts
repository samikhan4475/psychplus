import { useCallback } from 'react';

const useEmptyStringToNull = () => {
  const emptyStringToNull = useCallback(
    (value: string | undefined | null): string | null => {
      if (typeof value === 'string') {
        if (value === 'undefined') return null;
        return value.trim() !== '' ? value.trim() : null;
      }
      return null;
    },
    []
  );

  return { emptyStringToNull };
};

export default useEmptyStringToNull;
