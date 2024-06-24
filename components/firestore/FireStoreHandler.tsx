import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { FIREBASE_DB } from "../../FireBaseConfig";

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

export const [loading, setLoading] = useState(false);
export const [entries, setEntries] = useState([] as entryData[]);

const splitDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return { year, month, day };
};

/**
 * Function to read all entries given a selectedDate
 */
export const readDateEntry = async (date: string) => {
  console.log("check " + date);
  setLoading(true);

  try {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
    const newEntries: entryData[] = [];
    const { year, month, day } = splitDate(date);

    querySnapshot.forEach((doc) => {
      console.log(doc.data().year, doc.data().month, doc.data().day);
      console.log(year, month, day);
      if (
        doc.data().year === year &&
        doc.data().month === month &&
        doc.data().day === day
      ) {
        newEntries.push({
          id: doc.id,
          title: doc.data().title,
          isHappy: doc.data().isHappy,
          year: doc.data().year,
          month: doc.data().month,
          day: doc.data().day,
          textEntry: doc.data().textEntry,
        });
      }
    });

    setEntries(newEntries); // Update state once with new entries
    console.log(newEntries);
  } catch (error) {
    console.error("Error reading entries: ", error);
  } finally {
    setLoading(false);
  }
};

export const deleteEntry = async (item: entryData) => {
  const entryRef = doc(FIREBASE_DB, "entries", item.id);
  await deleteDoc(entryRef);
}
