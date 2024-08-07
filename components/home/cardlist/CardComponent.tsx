import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from '@rneui/base'
import { entryData } from '../../../utils/FireBaseHandler';
import { MaterialCommunityIcons } from '@expo/vector-icons'

type CardProps = {
  item: entryData;
  gotoViewEntry: (text: string) => void;
}

export default function CardComponent({ item, gotoViewEntry }: CardProps) {
  return (
    <View style={{
      width: 300,
    }}>
      <TouchableOpacity
        onPress={() => { gotoViewEntry(item.id) }}
        testID={`card-${item.id}`}
      >
        <Card containerStyle={{ height: 262 }}>
          <Card.Title
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ marginBottom: -5, fontSize: 18 }}
            testID={`card-title-${item.id}`}
          >
            {item.title}
          </Card.Title>
          <Card.Divider style={{ marginTop: 15 }} />
          {/* <Card.Image
            style={{ paddingTop: 30 }}
            source={{
              uri:
                'https://cdn-icons-png.flaticon.com/512/8999/8999474.png',
            }}
          /> */}
          <View style={{ flexDirection: 'row' }}>
            {item.mood === "Happy" ? (
              <MaterialCommunityIcons
                name="emoticon-happy-outline"
                size={20}
                color={"green"}
              />
            ) : item.mood === "Neutral" ? (
              <MaterialCommunityIcons
                name="emoticon-neutral-outline"
                size={20}
                color={"#9B870C"}
              />
            ) : (
              <MaterialCommunityIcons
                name="emoticon-sad-outline"
                size={20}
                color={"red"}
              />
            )}
            <Text
              numberOfLines={9}
              ellipsizeMode="tail"
              style={{ paddingStart: 5, paddingEnd: 15, textAlign: 'auto', lineHeight: 20 }}
              testID={`card-text-${item.id}`}
            >
              {item.textEntry}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  )
}
