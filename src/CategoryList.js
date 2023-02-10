import React, { useState, useEffect } from "react";
import { Input, Text, Button, Card } from "react-native-elements";
import { Swipeable } from "react-native-gesture-handler";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { styles } from "../App.js";
import { categoriesInit, notesInit } from "../JS/Statics.js";

export const CategoryList = ({ navigation }) => {
  const [categoriesList, setCategoriesList] = useState(categoriesInit);
  const [notes, setNotes] = useState(notesInit);
  const [categoryName, setName] = useState("");
  const [notesCount, setNotesCount] = useState({});

  useEffect(() => {
    let count = {};
    notes.forEach((note) => {
      if (!count[note.categoryId]) {
        count[note.categoryId] = 1;
      } else {
        count[note.categoryId] += 1;
      }
    });
    setNotesCount(count);
  }, [notes]);

  const addCategory = (categoryName) => {
    if (!categoryName) {
      Alert.alert("Error", "Please enter a category name.");
      return;
    }
    setCategoriesList([
      ...categoriesList,
      {
        id: Math.random().toString(),
        name: categoryName,
      },
    ]);
    setName("");
  };

  const addNote = (note, callback) => {
    setNotes((prevNotes) => [...prevNotes, note]);
    callback();
  };

  const deleteNote = (noteId, callback) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    callback();
  };

  const getNotesCount = (categoryId) => {
    return notesCount[categoryId] || 0;
  };

  return (
    <View>
      <Input
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholder="Enter a new category name"
        onChangeText={(categoryName) => setName(categoryName)}
        value={categoryName}
      />
      <Button
        title="Add"
        buttonStyle={styles.addNoteButton}
        onPress={() => addCategory(categoryName)}
      />
      <FlatList
        data={categoriesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Notes", {
                  categoryId: item.id,
                  AddNoteCounter: addNote,
                  DeleteNoteCounter: deleteNote,
                })
              }
            >
              <Card containerStyle={styles.categoryCard}>
                <Text style={styles.categoryItem} h5>
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.categoryCounter,
                    { fontWeight: "bold", fontSize: 20, color: "#00b894" },
                  ]}
                  h5
                >
                  {getNotesCount(item.id)}
                </Text>
              </Card>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  );
};
