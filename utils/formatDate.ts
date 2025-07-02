import { format, isToday, isYesterday } from 'date-fns';


export function formatDateLabel(date: Date) {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }); // ex: 29 Jun 2025
}

export function formatTimeLabel(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }); // ex: 14:32
}

export function formatDateLabelWithTodayYesterday(date: Date) {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'dd MMM yyyy'); // ex: 29 Jun 2025
}

