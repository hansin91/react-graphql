import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Alert ({ type, message }) {
  return (
    <View style={[styles.alert, type === 'success' ? styles.alertSuccess : styles.alertError]}>
      <Text style={[type === 'success' ? styles.textSuccess : styles.textError]}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  alert: {
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  alertSuccess: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb'
  },
  alertError: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb'
  },
  textSuccess: {
    color: '#155724'
  },
  textError: {
    color: '#721c24'
  }
})

export default Alert