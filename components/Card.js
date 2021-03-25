import React from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Checkbox} from 'react-native-paper';

export default function Card({item}) {
    const [checked, setChecked] = React.useState(false);

    return (
        <View style={styles.planCard}>
            <View style={styles.cardTextBox}>
                <Checkbox
                    style={styles.checkbox}
                    status={checked ? 'checked' : 'unchecked'}
                    uncheckedColor={'#3143e8'}
                    color={'midnightblue'}
                    onPress={() => {
                        setChecked(!checked);
                    }}/>
                <Text
                    style={[checked ? styles.strikeText : styles.unstrikeText ]}
                    numberOfLines={1}>{item.todo}</Text>
            </View>
            <TouchableOpacity style={styles.iconBox}>
                <Icon
                    name="eraser"
                    type="FontAwesome5"
                    size={25}
                    color="midnightblue"
                    onPress={() => Alert.alert('You made your day!')}/>
            </TouchableOpacity>
            <View style={styles.cardDeco}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    planCard: {
        backgroundColor: 'white',
        height: 60,
        width: 350,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 11,
        marginBottom: 11,
        shadowColor: "#091B31",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 9,
        flex: 1,
        flexDirection: 'row'
    },
    cardTextBox: {
        flexDirection: 'row',
        flex: 100,
        alignItems: 'center',
        marginLeft: 20,
        paddingRight: 10
    },
    strikeText: {
        marginLeft: 15,
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: '#bdc3c7',
        fontWeight: '500'
    },
    unstrikeText: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: '500'
    },
    iconBox: {
        alignSelf: 'center',
        marginRight: 20
    },
    cardDeco: {
        backgroundColor: '#091B31',
        flex: 1,
        height: 45,
        alignSelf: 'center'
    }
});
