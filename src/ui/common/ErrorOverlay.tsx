import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base';

interface ErrorOverlayProps {
    message: string;
    onConfirm: () => void;
}

const ErrorOverlay = ({message, onConfirm}: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error occurred!</Text>
        <Text style={[styles.text, styles.message]}>{message}</Text>
        <Button title='Okay'  onPress={onConfirm}></Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 24
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000',
    },
    message: {
        color: '#000',
        fontSize: 20
    }
})