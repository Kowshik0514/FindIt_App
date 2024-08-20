import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);  // Explicitly typed

  const convertToBase64 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const base64Url = `data:image/jpeg;base64,${result.assets[0].base64}`;  // Proper string interpolation
      setImage(base64Url);
      console.log("Base64 URL:", base64Url);
    }
  };

  const uploadImage = () => {
    // fetch("http:///10.23.85.193:3000/upload-image", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     base64: image
    //   })
    // })
    // .then((res) => res.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.error('Error:', error));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Upload Image</Text>
      <TouchableOpacity onPress={convertToBase64}>
        <View style={{ marginVertical: 20, padding: 10, backgroundColor: '#ccc', borderRadius: 5 }}>
          <Text>Select Image</Text>
        </View>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, marginVertical: 20 }}
        />
      )}
      <Button title="Upload" onPress={uploadImage} />
    </View>
  );
};

export default ImageUpload;
