import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { ProfileTab } from '../../../components/ProfileTab';
import { colors } from '../../../styleSheets/Styles';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate, getUser, readNoOfDateEntry } from '../../../utils/FireBaseHandler';
import { Button } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons'


// https://gifted-charts.web.app/

const data = () => {
  const userid = getUser();

  const [viewDate, setViewDate] = useState(new Date().getDate()); //Current date

  const getWeek = (date = new Date()) => {
    const dayIndex = date.getDay();
    const diffToLastMonday = (dayIndex !== 0) ? dayIndex - 1 : 6;
    const dateOfMonday = new Date(date.setDate(viewDate - diffToLastMonday));
    const dateOfMon = formatDate(dateOfMonday);
    const dateOfTues = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 1)));
    const dateOfWed = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 2)));
    const dateOfThur = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 3)));
    const dateOfFri = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 4)));
    const dateOfSat = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 5)));
    const dateOfSun = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 6)));
    // console.log(dateOfMon, dateOfTues, dateOfWed, dateOfThur, dateOfFri, dateOfSat, dateOfSun);
    return [dateOfMon, dateOfTues, dateOfWed, dateOfThur, dateOfFri, dateOfSat, dateOfSun];
  }

  const [barData, setBarData] = useState<any>([]);
  const [avgBarData, setAvgBarData] = useState(0);
  const [nextVisible, setNextVisible] = useState(false);

  const loadData = async () => {
    const weekData = await readNoOfDateEntry(getWeek(), userid);
    // console.log(weekData);
    return [
      { value: weekData[0], label: 'M' },
      { value: weekData[1], label: 'T' },
      { value: weekData[2], label: 'W' },
      { value: weekData[3], label: 'T' },
      { value: weekData[4], label: 'F' },
      { value: weekData[5], label: 'S' },
      { value: weekData[6], label: 'S' }
    ];
  };

  const prevWeek = async (date: number) => {
    setViewDate(date - 7);
    setNextVisible(true);
  }

  const nextWeek = async (date: number) => {
    setViewDate(date + 7);
    if (new Date().getDate() <= date + 7) {
      setNextVisible(false);
    }
  }

  useEffect(() => {
    (async () => {
      const weekData = await loadData();
      const avgBarData = weekData.reduce((a, v) => a + v.value, 0) / weekData.length;
      // console.log("Viewing Date " + viewDate);
      // console.log(avgBarData);
      // console.log(weekData);
      setBarData(weekData);
      setAvgBarData(avgBarData);
    })()
  }, [viewDate]);

  //Soon change color also 
  const pieData = [
    { value: 15, color: '#00AA00', label: 'Happy', focused: true, },
    { value: 13, color: '#EDED00', label: 'Neutral' },
    { value: 5, color: '#ED6665', label: 'Sad' },
  ];

  //Soon
  const lineData = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 10 },
    { value: 3 },
    { value: 1 },
    { value: 7 },
    { value: 15 },
  ];


  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
    }}>

      <ProfileTab name="Data" />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>

          {/* To change to ionicon button */}
          <TouchableOpacity
            onPress={() => prevWeek(viewDate)}
          >
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color={"white"}
            />
          </TouchableOpacity>

          <Text style={{
            fontSize: 30,
            color: 'white',
            alignSelf: 'center'
          }} >
            Weekly Recorded Data
          </Text>

          {/* To change to ionicon button */}
          <TouchableOpacity
            onPress={nextVisible ? () => nextWeek(viewDate) : () => null }
          >
            <Ionicons
              name="chevron-forward-outline"
              size={30}
              color={nextVisible ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        {/* Start of Bar Chart */}
        <View style={{
          paddingBottom: 20,
        }}>
          <Text style={{
            color: 'grey',
            fontSize: 25,
            alignSelf: 'center'
          }} >
            Number Of Upload Per Day
          </Text>

          <View style={{
            alignSelf: 'center',
            padding: 15,
            paddingRight: 60,
            borderWidth: 1,
            borderColor: 'white',
          }}>
            <BarChart
              data={barData}
              frontColor='white'
              yAxisThickness={0}
              xAxisThickness={0}
              yAxisColor="lightgray"
              xAxisColor="lightgray"
              backgroundColor="#414141"
              rulesColor="gray"
              noOfSections={5}
              focusBarOnPress
              renderTooltip={(item: any, index: any) => {
                return (
                  <View
                    style={{
                      marginBottom: 5,
                      marginLeft: 0,
                      backgroundColor: '#ffcefe',
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}>
                    <Text>{item.value}</Text>
                  </View>
                );
              }}
              yAxisTextStyle={{ color: 'white' }}
              xAxisLabelTextStyle={{ color: 'white' }}
              barWidth={22}
              width={300}
              showReferenceLine1
              referenceLine1Position={avgBarData}
              referenceLine1Config={{
                color: 'blue',
                dashWidth: 2,
                dashGap: 3,
              }}
            />
          </View>
        </View>
        {/* End of Bar Chart */}

        {/* Start of Pie Chart */}
        <View style={{
          paddingBottom: 20,
        }}>
          <Text style={{
            color: 'grey',
            fontSize: 25,
            alignSelf: 'center'
          }} >
            Overall Feelings
          </Text>

          <View style={{
            alignSelf: 'center',
            padding: 15,
            paddingRight: 30,
            borderWidth: 1,
            borderColor: 'white',
          }}>
            <PieChart
              showText
              textColor="black"
              radius={150}
              textSize={20}
              showValuesAsLabels
              showTextBackground
              textBackgroundRadius={26}
              data={pieData}
              donut
              sectionAutoFocus
              innerRadius={60}
              innerCircleColor={colors.background}
              centerLabelComponent={() => {
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                      style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                      45%
                      {/* Caculate the % */}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>Happiness</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        {/* End of Pie Chart */}

        {/* Start of Pie Chart */}
        <View style={{
          paddingBottom: 20,
        }}>
          <Text style={{
            color: 'grey',
            fontSize: 25,
            alignSelf: 'center'
          }} >
            Happiness for the month?
          </Text>

          <LineChart
            data={lineData}
            width={320}
            isAnimated
            thickness={4}
            color="#07BAD1"
            noOfSections={3}
            animateOnDataChange
            animationDuration={1500}
            areaChart
            yAxisTextStyle={{ color: 'lightgray' }}
            hideDataPoints
            startFillColor={'rgb(84,219,234)'}
            endFillColor={'rgb(84,219,234)'}
            startOpacity={0.4}
            endOpacity={0.1}
            spacing={22}
            backgroundColor="#414141"
            rulesColor="gray"
            rulesType="solid"
            initialSpacing={0}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
          />
        </View>
        {/* </View> */}
        {/* End of Line Chart */}

      </ScrollView>
    </View>
  );
};

export default data;