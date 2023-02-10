import React, { useState, useEffect } from "react";
import { View, FlatList, Image } from "react-native";
import { Card, Button, Text } from "react-native-elements";

export const NotesList = ({ route, navigation, notesInit, onDeleteNote }) => {
  const { AddNoteCounter, DeleteNoteCounter } = route.params;
  const [notes, setNotes] = useState(notesInit);
  const categoryId = route.params.categoryId;
  const filteredNotes = notes.filter((note) => note.categoryId === categoryId);

  const handleDeleteNote = (noteId) => {
    DeleteNoteCounter(noteId, () => {
      console.log("-1");
    });
    onDeleteNote(noteId);
  };

  useEffect(() => {
    setNotes(notesInit);
  }, [notesInit]);

  return (
    <View>
      <Button
        title="Add Note"
        onPress={() =>
          navigation.navigate("AddNote", {
            categoryId,
            AddNoteCounter,
          })
        }
      />
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card title={item.title}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: "#2196F3",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "red" }}>{item.content}</Text>
            {item.image && (
              <Image source={item.image} style={{ width: 200, height: 200 }} />
            )}
            <Button
              title="Delete"
              onPress={() => handleDeleteNote(item.id)}
              type="clear"
            />
          </Card>
        )}
      />
    </View>
  );
};
