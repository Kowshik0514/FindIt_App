import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>profile</Text>
    </View>
  )
}

export default Profile


const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff'

  }
  
})