//each diary entry
/*
  1. id
  2. title
  3. isHappy
  4. date
    4.1 Year
    4.2 Month
    4.3 Day
  5. textEntry
*/
export type entryData = {
  id: string;
  title: string;
  isHappy: boolean;
  year: number;
  month: number;
  day: number;
  textEntry: string;
};