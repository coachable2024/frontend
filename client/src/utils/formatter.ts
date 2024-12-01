// src/utils/formatters.ts
export const formatDuration = (minutes: number | undefined): string => {
    if (!minutes) return '0 minutes';
    
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'}`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    let result = `${hours} hour${hours === 1 ? '' : 's'}`;
    if (remainingMinutes > 0) {
      result += ` ${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}`;
    }
    
    return result;
  };