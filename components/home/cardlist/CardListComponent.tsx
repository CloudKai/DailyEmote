import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { colors } from '../../../styleSheets/Styles'
import { entryData } from '../../../utils/FireBaseHandler';
import { Card } from '@rneui/base';
import CardComponent from './CardComponent';

type CardListProps = {
  data: entryData[];
  gotoViewEntry: (text: string) => void;
}

export default function CardListComponent( { data, gotoViewEntry }: CardListProps) {
  return (
    <View style={CardListStyles.container}>
      <FlatList  
          extraData={data}
          data = {data}
          horizontal
          persistentScrollbar = {true}
          showsHorizontalScrollIndicator = {false}
          keyExtractor={i => i.id}
          renderItem={({item}) => {
            return (
              <CardComponent item={item} gotoViewEntry={gotoViewEntry}/>
            )
          }}
      />
    </View>
  )
}

const CardListStyles = StyleSheet.create({
  container: {
    width: '100%', 
    backgroundColor: colors.background,
    alignSelf: 'center',
    paddingTop: 10,
  },
});

/* mapped list function
{data.map((item) => {
  return (
    <CardComponent key={item.id} item={item} />
  )
})}
*/