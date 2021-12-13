export const indexIsOutOfBound = (limit: number, index: number): boolean => {
    if (index < 0) {
      return true;
    }
  
    if (index > limit - 1) {
      return true;
    }
  
    return false;
}
