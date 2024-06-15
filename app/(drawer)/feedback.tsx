import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native-safe-area-context'

const feedback = () => {
    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'How may I help you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: '',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages: any[] = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages))
    }, [])
  
    return (
        <SafeAreaView style = {{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                _id: 1,
                }}
            />
      </SafeAreaView>
    );
}

export default feedback