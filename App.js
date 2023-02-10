import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CategoryList } from "./src/CategoryList.js";
import { NotesList } from "./src/NotesList.js";
import { AddNote } from "./src/AddNote.js";
import { notesInit } from "./JS/Statics.js";

export default function App() {
  const Stack = createStackNavigator();
  const [notes, setNotes] = useState(notesInit);

  const onAddNote = (note, callback) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
    if (callback) {
      callback();
    }
  };

  const onDeleteNote = (noteId, callback) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    if (callback) {
      callback();
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categories">
          {(props) => <CategoryList {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Notes">
          {(props) => (
            <NotesList
              {...props}
              notesInit={notes}
              onDeleteNote={onDeleteNote}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddNote">
          {(props) => <AddNote {...props} onAddNote={onAddNote} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  categoryItem: {
    padding: 20,
    fontSize: 18,
  },
  noteItem: {
    padding: 20,
    fontSize: 16,
  },
  addNote: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
    marginVertical: 16,
    width: "50%",
    textAlign: "center",
    shadowColor: "#000",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  listContent: {
    padding: 16,
  },
  swipeableRight: {
    backgroundColor: "red",
    justifyContent: "center",
    padding: 16,
  },
  categoryCard: {
    marginBottom: 16,
  },
  categoryItem: {
    fontSize: 20,
    marginBottom: 16,
  },
  categoryCounter: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});
