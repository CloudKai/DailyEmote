import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FireBaseConfig";
import { Alert } from "react-native";

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
  isHappy: boolean,
  year: number,
  month: number,
  day: number,
  textEntry: string,
}

const splitDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return { year, month, day };
};

/**
 * Function to read all entries given a selectedDate
 */
export const readDateEntry = async (date: string, userid: string) => {
  const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
  const newEntries: entryData[] = [];
  const { year, month, day } = splitDate(date);
  querySnapshot.forEach((doc) => {
    console.log(doc.data().year, doc.data().month, doc.data().day,);
    console.log(year, month, day,);
    if (doc.data().year === year && doc.data().month === month && doc.data().day === day && doc.data().userid === userid) {
      newEntries.push({
        userid: doc.data().userid,
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
    isHappy: false,
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
        isHappy: doc.data().isHappy,
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
export const addEntry = async (title: string, dateString: string, textEntry: string) => {
  if (title === "" || dateString === "" || textEntry === "") {
    Alert.alert("Warning", "Please don't leave any fields empty");
  }
  const [ year, month, day ] = dateString.split("-");
  try {
    const entriesRef = collection(FIREBASE_DB, "entries");
    const document = await addDoc(entriesRef, {
      title: title,
      year: year,
      month: month,
      day: day,
      textEntry: textEntry,
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
export const editEntry = async (id: string, title: string, dateString: string, textEntry: string) => {
  const [ year, month, day ] = dateString.split("-");
  try {
    const docRef = doc(FIREBASE_DB, "entries", id);
    await updateDoc(docRef, {
      title: title,
      year: year,
      month: month,
      day: day,
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