import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FireBaseConfig";
import { DateData } from "react-native-calendars";
import { useState } from "react";

/* each diary entry
  1. userid
  2. id
  3. title
  4. date
    4.1 Year
    4.2 Month
    4.3 Day
  5. textEntry
*/
export type entryData = {
  userid: string,
  id: string,
  title: string,
  mood: string,
  year: number,
  month: number,
  day: number,
  textEntry: string,
}

/**
 * Splits the date string into year, month, and day
 * @param date in format "YYYY-MM-DD"
 * @returns an object with year, month, and day 
 */
export const splitDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return { year, month, day };
};

/**
 * Formats the date produced by the date picker to "YYYY-MM-DD"
 * @param date as a Date object
 * @returns string in form "YYYY-MM-DD"
 */
export const formatDate = (date: Date) => {
  const year: string = date.getFullYear().toString();
  const month: string =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString();
  const day: string =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
  return year + "-" + month + "-" + day;
}

/**
 * Function to read all entries given a selectedDate
 */
export const readDateEntry = async (date: string, userid: string) => {
  const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
  const newEntries: entryData[] = [];
  const { year, month, day } = splitDate(date);
  querySnapshot.forEach((doc) => {
    console.log(doc.data().year, doc.data().month, doc.data().day, doc.data().userid);
    console.log(year, month, day, userid);
    if (doc.data().year === year && doc.data().month === month && doc.data().day === day && doc.data().userid === userid) {
      newEntries.push({
        userid: doc.data().userid,
        id: doc.id, 
        title: doc.data().title, 
        mood: doc.data().mood,
        year: doc.data().year,
        month: doc.data().month,
        day: doc.data().day,
        textEntry: doc.data().textEntry,
      });
    }
  });
  console.log(newEntries);
  return newEntries;
}

/**
 * Function to read an entry given the id of the entry
 */
export const readSingleEntry = async (id: string) => {
  const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
  let entry: entryData = {
    userid: "",
    id: "",
    title: "",
    mood: "",
    year: 0,
    month: 0,
    day: 0,
    textEntry: "",
  };
  querySnapshot.forEach((doc) => {
    if (doc.id === id) {
      entry = {
        userid: doc.data().userid,
        id: doc.id, 
        title: doc.data().title, 
        year: doc.data().year,
        mood: doc.data().mood,
        month: doc.data().month,
        day: doc.data().day,
        textEntry: doc.data().textEntry,
      };
    }
  });
  return entry;
}

/**
 * Function to add an entry to the database
 * Receives a title, dateString, and textEntry from user input
 */
export const addEntry = async (title: string, dateString: string, textEntry: string, mood: string) => {
  const [ year, month, day ] = dateString.split("-");
  try {
    const entriesRef = collection(FIREBASE_DB, "entries");
    const document = await addDoc(entriesRef, {
      title: title,
      year: year,
      month: month,
      day: day,
      textEntry: textEntry,
      mood: mood,
      userid: FIREBASE_AUTH.currentUser?.uid,
    });
    console.log("Document written with ID: ", document.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * Function to edit an entry in the database
 * Receives an id, title, dateString, and textEntry from user input
 */
export const editEntry = async (id: string, title: string, dateString: string, textEntry: string, mood: string) => {
  const [ year, month, day ] = dateString.split("-");
  try {
    const docRef = doc(FIREBASE_DB, "entries", id);
    await updateDoc(docRef, {
      title: title,
      year: year,
      month: month,
      day: day,
      mood: mood,
      textEntry: textEntry,
    });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * Function to delete an entry in the database
 * Receives an id of the entry to be deleted
 */
export const deleteEntry = async (id: string) => {
  const entryRef = doc(FIREBASE_DB, "entries", id);
  await deleteDoc(entryRef);
}

/**
 * Function to get the current user's id through Firebase Auth module
 */
export const getUser = () => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else { 
    return "";
  }
}


/**
 * Function to read all the number of entries in the week
 */
export const readNoOfDateEntry = async (dateString: any, userid: string) => {
  const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
  let i = 0;
  const weeklyData: number[] = [];
  dateString.forEach((element: string) => {
    const { year, month, day } = splitDate(element);
    querySnapshot.forEach((doc) => {
      if (doc.data().year === year && doc.data().month === month && doc.data().day === day && doc.data().userid === userid) {
        i += 1;
      }
    });
    weeklyData.push(i);
    i = 0;
  });
  return weeklyData;
}