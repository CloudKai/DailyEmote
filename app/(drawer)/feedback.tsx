import { View, Text, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FireBaseConfig'
import { colors } from '../../styleSheets/Styles'
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import BackButton from '../../components/BackButton'

const feedback = () => {
  const [messages, setMessages] = useState<any[]>([])
  // const [firstMessage, setfirstMessage] = useState<any[]>([])
  const auth = FIREBASE_AUTH;

  const userDetails = {
    _id: auth?.currentUser?.email!,
    name: auth?.currentUser?.displayName!,
    avatar: auth?.currentUser?.photoURL!
  };

  useEffect(() => {
    // setfirstMessage([
    //   {
    //     _id: 1,
    //     text: 'Your Feedback will be greatly appreciated. Thank You!',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'DailyEmote',
    //     },
    //   },
    // ]);

    const q = query(collection(FIREBASE_DB, 'chats'), orderBy("createdAt", "desc"), where("user", "==", userDetails));
    const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }))
    ));

    return () => {
      unsubscribe();
    };

  }, []);



  const onSend = useCallback((messages: any[] = []) => {

    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(FIREBASE_DB, 'chats'), { _id, createdAt, text, user });
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <BackButton name="Feedback Chat" />

      <GiftedChat
        placeholder='Enter your Feedback'
        messages={messages}
        onSend={messages => onSend(messages)}
        user={userDetails}
      />
    </SafeAreaView>
  );

}

export default feedback
