import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { ProfileTab } from '../../../components/ProfileTab';
import { colors } from '../../../styleSheets/Styles';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate, getUser, readNoOfDateEntry, readNoOfHappyInADay, readNoOfMoods } from '../../../utils/FireBaseHandler';
import { Button } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router';

// https://gifted-charts.web.app/

const data = () => {
  const userid = getUser();

  const [viewDate, setViewDate] = useState(new Date().getDate()); //Current date
  const [dayMonday, setDayMonday] = useState("");
  const [daySunday, setDaySunday] = useState("");

  const getWeek = (dateOfMonday: Date, dateOfSun: String, date = new Date()) => {
    const dateOfMon = formatDate(dateOfMonday);
    const dateOfTues = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 1)));
    const dateOfWed = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 2)));
    const dateOfThur = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 3)));
    const dateOfFri = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 4)));
    const dateOfSat = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 5)));
    //Sunday already done
    // console.log(dateOfMon, dateOfTues, dateOfWed, dateOfThur, dateOfFri, dateOfSat, dateOfSun);
    return [dateOfMon, dateOfTues, dateOfWed, dateOfThur, dateOfFri, dateOfSat, dateOfSun];
  }

  const [barData, setBarData] = useState<any>([]);
  const [avgBarData, setAvgBarData] = useState(0);
  const [nextVisible, setNextVisible] = useState(false);

  const loadData = async (dateOfMonday: Date, dateOfSunday: string) => {
    const weekData = await readNoOfDateEntry(getWeek(dateOfMonday, dateOfSunday), userid);
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

  const [pieData, setPieData] = useState<any>([0, 0, 0]);
  const [happyPieData, setHappyPieData] = useState(0);

  const loadMoodData = async (dateOfMonday: Date, dateOfSunday: string) => {
    const weekMoodData = await readNoOfMoods(getWeek(dateOfMonday, dateOfSunday), userid);
    //console.log(weekMoodData);
    return [
      { value: weekMoodData[0], color: '#00AA00', label: 'Happy', focused: true, },
      { value: weekMoodData[1], color: '#EDED00', label: 'Neutral' },
      { value: weekMoodData[2], color: '#ED6665', label: 'Sad' },
    ];
  };

  // const [happyData, setHappyData] = useState<any>([]);

  // const lineGraphMoods = async (dateOfMonday: Date, dateOfSunday: string) => {
  //   const weekHappyDayData = await readNoOfHappyInADay(getWeek(dateOfMonday, dateOfSunday), userid);
  //   console.log(weekHappyDayData);

  //   // Transform the data into the desired format
  //   const result = weekHappyDayData.map((doc) => ({
  //     value: doc[0]
  //   }));

  //   return [result];
  // };

  const happyData = [
    { value: 0 },
    { value: 10 },
    { value: 8 },
  ];

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

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const date = new Date()
        const dayIndex = date.getDay();
        const diffToLastMonday = (dayIndex !== 0) ? dayIndex - 1 : 6;
        const dateOfMonday = new Date(date.setDate(viewDate - diffToLastMonday));
        const dateOfSunday = formatDate(new Date(date.setDate(dateOfMonday.getDate() + 6)))
        setDayMonday(formatDate(dateOfMonday));
        setDaySunday(dateOfSunday)

        const weekData = await loadData(dateOfMonday, dateOfSunday);
        const avgBarData = weekData.reduce((a, v) => a + v.value, 0) / weekData.length;
        // console.log("Viewing Date " + viewDate);
        // console.log(avgBarData);
        // console.log(weekData);
        setBarData(weekData);
        setAvgBarData(avgBarData);

        const weekMoodData = await loadMoodData(dateOfMonday, dateOfSunday);
        setPieData(weekMoodData);
        const happyPercent = 100 * (weekMoodData[0].value / (weekMoodData[0].value + weekMoodData[1].value + weekMoodData[2].value))
        setHappyPieData(Number.isNaN(happyPercent) ? 0 : parseInt(happyPercent.toFixed(0)));

        // const lineGraphData = await lineGraphMoods(dateOfMonday, dateOfSunday);
        // setHappyData(lineGraphData);
      })()
    }, [viewDate, userid])
  );


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
          alignItems: 'center',
          alignContent: 'center'
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
          }}>
            Weekly Recorded Data
          </Text>

          {/* To change to ionicon button */}
          <TouchableOpacity
            onPress={nextVisible ? () => nextWeek(viewDate) : () => null}
          >
            <Ionicons
              name="chevron-forward-outline"
              size={30}
              color={nextVisible ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{
            fontSize: 20,
            color: 'white',
            alignSelf: 'center'
          }}>
            {'['} {dayMonday.split("-").reverse().join("-")}  -  {daySunday.split("-").reverse().join("-")} {']'}
          </Text>
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
                    <Text> {item.value} </Text>
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
            {pieData[0].value !== 0 || pieData[1].value !== 0 || pieData[2].value !== 0 ? (
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
                        {happyPieData}%
                      </Text>
                      <Text style={{ fontSize: 14, color: 'white' }}>Happiness</Text>
                    </View>
                  );
                }}
              />
            ) : (
              <Text style={{
                color: 'white',
                fontSize: 30,
                textAlign: 'center',
                paddingLeft: 15
              }}>
                No Mood Record Found
              </Text>
            )}
          </View>
        </View>
        {/* End of Pie Chart */}


        {/* Start of Line Chart */}
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
            data={happyData}
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