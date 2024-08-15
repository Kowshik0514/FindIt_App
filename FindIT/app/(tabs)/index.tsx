import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Index = () => {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff'

  }
  
})