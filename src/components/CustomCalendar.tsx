import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const StyledCalendar = styled(Calendar)`
  width: 300px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 16px;
`;

const CalendarWrapper = styled.div`
  position: relative;
`;

const CalendarIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
`;

type CustomCalendarProps = {
  value: any;
};

const CustomCalendar = ({ value }: CustomCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  return (
    <CalendarWrapper>
      <StyledCalendar
        value={value}
        onChange={handleDateChange}
        onClickDay={handleDateChange}
        calendarType='US'
        locale='en-US'
        showNeighboringMonth={false}
        tileDisabled={({ activeStartDate, date, view }) =>
          view === 'month' && date.getDay() === 6
        }
        minDetail='month'
        maxDetail='month'
        prev2Label={null}
        next2Label={null}
        formatLongDate={(locale, date) =>
          new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).format(date)
        }
        formatShortWeekday={(locale, date) =>
          new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)
        }
        formatMonthYear={(locale, date) =>
          new Intl.DateTimeFormat(locale, {
            month: 'long',
            year: 'numeric',
          }).format(date)
        }
        showFixedNumberOfWeeks={true}
        className={isOpen ? 'open' : ''}
      />
      <CalendarIcon onClick={toggleCalendar}>📅</CalendarIcon>
    </CalendarWrapper>
  );
};

export default CustomCalendar;
