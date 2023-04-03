import moment from 'moment';

export function formatDate(dateString: string, formatString: string) {
  const dateObj = moment(dateString, 'YYYY-MM-DD');
  return dateObj.format(formatString);
}
