/**
 * Format date from timestamp
 * @param timestamp Unix timestamp in milliseconds
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  /**
   * Format time from timestamp
   * @param timestamp Unix timestamp in milliseconds
   * @returns Formatted time string
   */
  export const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  export const formatForecastDate = (day: string): string => {
    const parsed = new Date(day);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  
  
    return day;
  };
  