import {
  isToday,
  isTomorrow,
  isSameWeek,
  isYesterday,
  format,
  differenceInCalendarDays,
} from 'date-fns';
import React from 'react';

const FormatedDate = ({ date }: { date: Date | null }) => {
  const [currentDate, setCurrentDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const getFormattedDate = (date: Date | null) => {
    if (!date) return 'Pick a date';
    if (!currentDate) return '';

    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';

    if (isSameWeek(date, currentDate)) {
      const dayDifference = differenceInCalendarDays(date, currentDate);

      if (dayDifference < 0) {
        return `Last ${format(date, 'EEEE')}`;
      } else {
        return `${format(date, 'EEEE')}`;
      }
    }

    return format(date, 'PPP');
  };

  return <>{getFormattedDate(date)}</>;
};

export default FormatedDate;
