import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Found = () => {
  return (
    <View style={styles.container}>
      <Text>founds</Text>
    </View>
  )
}

export default Found

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff'

  }
  
})