import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Toolbar from './uikit/Toolbar';

class CompletePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Toolbar />
                <ScrollView style={styles.page}>
                    <Text style={styles.textHeading}>Complete.</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    page: {
        flex: 1,
        backgroundColor: '#F7F9FB',
        padding: 15
    },
    footer: {
        backgroundColor: '#F7F9FB',
    },
    textHeading: {
        margin: 15,
        marginTop: 20,
        color: '#14202C',
        fontSize: 18, 
        textAlign: 'center'
    },
});

export default CompletePage;