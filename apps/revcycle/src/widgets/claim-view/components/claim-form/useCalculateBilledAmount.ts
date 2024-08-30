import { useCallback } from 'react';
import { ClaimServiceLine } from './types';

const useCalculateBilledAmount = () => {
  const calculateBilledAmount = useCallback((claimServiceLines: ClaimServiceLine[]): number => {
    if (!Array.isArray(claimServiceLines)) {
      return 0; // Handle error appropriately
    }
    return claimServiceLines.reduce((sum, serviceLine) => {
      return sum + (serviceLine.totalAmount ?? 0);
    }, 0);
  }, []);

  return calculateBilledAmount;
};

export default useCalculateBilledAmount;