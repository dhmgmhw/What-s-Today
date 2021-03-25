import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Loading() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/loading.gif')} style={styles.loadingImage} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        //앱의 배경 색
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#091B31',
    },
    loadingImage: {
        width:'15%',
        height:'15%',
        bottom:70
    }

})