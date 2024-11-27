import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Participant } from "../components/Participant";

import { styles } from "./style";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');
  
  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participant exists", "There is already a participant in the list with that name.");
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    
    Alert.alert("Remove", `Remove the participant ${name}?`, [
      {
        text: 'Yes',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'No',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Event name
      </Text>

      <Text style={styles.eventDate}>
        Friday, November 27, 2024.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Has no one arrived at the event yet? Add attendees to your attendance list.
          </Text>
        )}
      />
    </View>
  )
}