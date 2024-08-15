import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Lost = () => {
  return (
    <View style={styles.container}>
      <Text>Lost</Text>
    </View>
  )
}

export default Lost

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff'

  }
  
})