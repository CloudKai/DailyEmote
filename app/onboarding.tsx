import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { colors } from '../styleSheets/Styles';
import { setItem } from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const onboarding = () => {
    const router = useRouter();

    const handleDone = () => {
        router.navigate('/(auth)/signin');
        setItem('onboarded', '1');
    }

    const doneButton = ({...props}) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text> Done </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style = {{ flex: 1, backgroundColor: '#fff' }}>
            <Onboarding
                onDone = {handleDone}
                onSkip = {handleDone}
                bottomBarHighlight = {false}
                DoneButtonComponent={doneButton}
                containerStyles = {{ paddingHorizontal: 15 }}
                pages={[
                    {
                    backgroundColor: colors.accent,
                    image: (
                        <View style = {styles.lottie}>
                            <Lottie
                                style = {{ flex: 1 }} 
                                source = {require('../assets/animations/Welcome.json')} autoPlay loop 
                            />
                        </View>
                    ),
                    title: 'Welcome',
                    subtitle: 'Welcome to DailyEmote',
                    },

                    {
                        backgroundColor: colors.secondaryBackground,
                        image: (
                            <View style = {styles.lottie}>
                                <Lottie
                                    style = {{ flex: 1 }} 
                                    source = {require('../assets/animations/Welcome.json')} autoPlay loop 
                                />
                            </View>
                        ),
                        title: 'Record Events',
                        subtitle: 'Record your events like never before',
                    },
                    
                    {
                        backgroundColor: colors.tertiaryBackground,
                        image: (
                            <View style = {styles.lottie}>
                                <Lottie
                                    style = {{ flex: 1 }} 
                                    source = {require('../assets/animations/Welcome.json')} autoPlay loop 
                                />
                            </View>
                        ),
                        title: 'Get Started',
                        subtitle: 'Start Now',
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 200,
        height: 300,
    },
    doneButton: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
    }
})

export default onboarding;