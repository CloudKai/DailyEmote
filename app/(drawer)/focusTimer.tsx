import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { colors } from '../../styleSheets/Styles';
import HeaderComponent from '../../components/HeaderComponent';
import { router } from 'expo-router';

const MeditationTimer = () => {
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive && !isPaused) {
            intervalRef.current = setInterval(() => {
                setElapsedTime((prev) => {
                    if (prev >= (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0)) {
                        clearInterval(intervalRef.current);
                        setIsActive(false);
                        setIsInputDisabled(false);
                        Alert.alert('Time’s up!', 'Meditation time is over.');
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else if (!isActive && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, isPaused]);

    const handleStart = () => {
        const min = parseInt(minutes, 10);
        const sec = parseInt(seconds, 10);
        if ((isNaN(min) || min < 0) || (isNaN(sec) || sec < 0 || sec >= 60)) {
            Alert.alert('Invalid input', 'Please enter valid minutes (0 or more) and seconds (0-59).');
            return;
        }
        setElapsedTime(0);
        setIsActive(true);
        setIsPaused(false);
        setIsInputDisabled(true);
    };

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(true);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(false);
        setElapsedTime(0);
        setMinutes('');
        setSeconds('');
        setIsInputDisabled(false);
    };

    const formatTime = (elapsedTime) => {
        const totalMinutes = Math.floor(elapsedTime / 60);
        const totalSeconds = elapsedTime % 60;
        return `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style = {{
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 30,
          }}>
    <HeaderComponent title={"Focus Timer"} goBack={() => router.back()} />

            <View style={styles.container}>

                <Text style={styles.title}>Meditation Timer</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Minutes"
                        value={minutes}
                        onChangeText={(text) => setMinutes(text)}
                        editable={!isInputDisabled}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Seconds"
                        value={seconds}
                        onChangeText={(text) => setSeconds(text)}
                        editable={!isInputDisabled}
                    />
                </View>
                <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
                <View style={styles.buttonContainer}>
                    {!isActive ? (
                        <TouchableOpacity style={styles.button} onPress={handleStart}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleStop}>
                            <Text style={styles.buttonText}>Stop</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button} onPress={handleReset}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        width: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    timerText: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 400,
    },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        padding: 15,
        margin: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MeditationTimer;
