import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { styles } from "../App.js";
import moment from "moment";

const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const options2 = {
  durationLimit: 1,
  saveToPhotos: false,
  cameraType: "back",
};

export const AddNote = ({ navigation, route, onAddNote }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const categoryId = route.params.categoryId;
  const { AddNoteCounter } = route.params;
  const date = moment().format("MMMM Do YYYY, h:mm a");

  const handleAddNote = () => {
    if (!content) {
      Alert.alert("Error", "Please insert content.");
      return;
    }
    const note = {
      id: Math.random().toString(),
      categoryId,
      title: date,
      content,
      image: image,
    };
    AddNoteCounter(note, () => {
      console.log("+1");
    });
    onAddNote(note, () => {
      navigation.goBack();
    });
  };

  const handleImagePicker = () => {
    launchCamera(options2, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        console.log(source);

        setImage(source);
      }
    });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Content"
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Choose Image" onPress={handleImagePicker} />
      {image && <Image source={image} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity onPress={handleAddNote}>
        <Text style={styles.addNote}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
