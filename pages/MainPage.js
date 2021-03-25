import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Alert,
    Modal,
    Pressable,
    Image
} from 'react-native';
import { firebase_db } from '../firebaseConfig';
import Loading from '../pages/Loading';
import Card from '../components/Card';
import axios from "axios"
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Location from "expo-location";


export default function MainPage() {
    const [state, setState] = useState([])
    const [weather, setWeather] = useState({ temp: 17.29, condition: `Haze` })
    const [modalVisible, setModalVisible] = useState(false);
    const [ready,setReady] = useState(true)

    useEffect(() => {
        getLocation()
        setTimeout(()=>{
            setReady(false)
            firebase_db
                .ref('/todolist')
                .once('value')
                .then((snapshot) => {
                    let todo = snapshot.val();
                    setState(todo)
                })
        },6000)
    }, [])

    const getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();
            const locationData = await Location.getCurrentPositionAsync();
            const latitude = locationData['coords']['latitude']
            const longitude = locationData['coords']['longitude']
            const API_KEY = "a692d1aa3b42f0164f8da45c316414e0";
            const result = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );

            const temp = result.data.main.temp;
            const condition = result
                .data
                .weather[0]
                .main
            console
                .log(temp)
            console.log(condition)

            setWeather({ temp, condition })
        } catch (error) {
            Alert.alert("Cannot find where you are :(");
        }
    }

    return ready ? <Loading/> : (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Main header works */}
            <View style={styles.headContainer}>
                <ImageBackground
                    source={{
                        uri: 'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixid=MXwxMjA3fDB8' +
                            'MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&' +
                            'q=80'
                    }}
                    style={styles.imageStyle} />
                <View style={styles.innerBox}>
                    <Text style={styles.innerBoxText}>Greetings,{"\n"}Honange!</Text>
                    <Text style={styles.innerBoxWhether}>{weather.temp + '°C,\n' + weather.condition}</Text>
                </View>
            </View>
            
            {/* Card works */}
            <ScrollView style={styles.mainContainer}>
                {
                    state.map((item, i) => {
                        return (<Card item={item} key={i} />)
                    })
                }
            </ScrollView>

            {/* Bottom Navigator */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.iconBox}>
                    <Icon
                        name="calendar-alt"
                        type="FontAwesome5"
                        size={30}
                        color="midnightblue"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBox}>
                    <Icon
                        name="user-alt"
                        type="FontAwesome5"
                        size={30}
                        color="midnightblue"
                    />
                </TouchableOpacity>
            </View>

            {/* modal works */}
            <TouchableOpacity
                style={styles.addModal}
                onPress={() => setModalVisible(!modalVisible)}>
                <Icon
                    style={styles.addModalIcon}
                    name="edit"
                    type="FontAwesome5"
                    size={30}
                    color="midnightblue" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>What are you gonna do Today?</Text>
                        <TextInput style={styles.todoInput} placeholder="I'm gonna do..." />
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1528938102132-4a9276b8e320?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                            }}
                            style={styles.modalImage} />

                        <Pressable style={[styles.button]} onPress={() => Alert.alert('Good Luck!')}>
                            <Text style={styles.textStyle}>Note!</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#091B31',
    },
    headContainer: {
        backgroundColor: '#091B31',
        height: 230
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderBottomWidth: 5,
        borderColor: '#bdc3c7'
    },
    headText: {
        marginTop: 30,
        marginLeft: 30,
        fontSize: 40,
        color: 'white',
        fontWeight: '300'
    },
    innerBox: {
        backgroundColor: '#091B20',
        height: 200,
        width: '40%',
        position: 'absolute',
        top: 11,
        left: 220,
        borderRadius: 15,
        shadowColor: "#091B31",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 9
    },
    innerBoxText: {
        marginTop: 30,
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        fontFamily: 'Allan_400Regular'
    },
    innerBoxWhether: {
        marginTop: 30,
        color: 'white',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '600'
    },
    mainContainer: {
        backgroundColor: '#ecf0f1'
    },
    bottomContainer: {
        height: 70,
        backgroundColor: 'white',
        shadowColor: "#091B31",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBox: {
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60
    },
    addModal: {
        height: 65,
        width: 65,
        backgroundColor: 'white',
        borderRadius: 50,
        position: 'absolute',
        top: 700,
        alignSelf: 'center',
        borderColor: 'midnightblue',
        borderWidth: 7,
        shadowColor: "#091B31",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 9
    },
    addModalIcon: {
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 320
    },
    modalText: {
        color: 'white',
        fontSize: 28,
        marginBottom: 30,
        textAlign: "center",
        fontFamily: 'Allan_400Regular'
    },
    modalView: {
        width: 355,
        height: 600,
        margin: 20,
        backgroundColor: "#091B31",
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalImage: {
        width: 250,
        height: 180,
        borderRadius: 20,
        marginBottom: 20
    },
    todoInput: {
        height: 40,
        width: 245,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingLeft: 15,
        marginBottom: 30
    },
    button: {
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        backgroundColor: "white"
    },
    buttonClose: {
        backgroundColor: "#bdc3c7"
    },
    textStyle: {
        color: "#091B31",
        fontWeight: "bold",
        textAlign: "center"
    },

});
