import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../styleSheets/Styles'
import { entryData } from '../../../utils/FireBaseHandler';
import CardComponent from '../cardlist/CardComponent';

type CardListProps = {
  data: entryData[];
  gotoViewEntry: (text: string) => void;
}

export default function CardListComponent({ data, gotoViewEntry }: CardListProps) {
  return (
    <View style={CardListStyles.container}>
      {data.map((item) => (
        <CardComponent key={item.id} item={item} gotoViewEntry={gotoViewEntry} />
      ))}
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
