import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');
  const [contact, setContact] = useState('');
  const [socialMedia1, setSocialMedia1] = useState('facebook');
  const [socialMedia2, setSocialMedia2] = useState('x');

  const handleSubmit = async () => {
    if (name && manager && contact && socialMedia1 && socialMedia2) {
      const newProject = {
        id: Date.now(),  // Genera un id único basado en la fecha actual
        name,
        manager,
        contact,
        socialMedia: [socialMedia1, socialMedia2],
      };

      try {
        const storedProjects = await AsyncStorage.getItem('projects');
        const projects = storedProjects ? JSON.parse(storedProjects) : [];
        const updatedProjects = [...projects, newProject];
        await AsyncStorage.setItem('projects', JSON.stringify(updatedProjects));
        
        // Limpiar los campos del formulario
        setName('');
        setManager('');
        setContact('');
        setSocialMedia1('facebook');
        setSocialMedia2('x');

        // Navegar a Home después de limpiar los campos
        setTimeout(() => {
          navigation.navigate('Home');
        }, 100);
      } catch (error) {
        console.error('Failed to save the project.', error);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Proyecto:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre del proyecto"
        style={styles.input}
      />
      <Text style={styles.label}>Nombre del Manager:</Text>
      <TextInput
        value={manager}
        onChangeText={setManager}
        placeholder="Ingrese el nombre del manager"
        style={styles.input}
      />
      <Text style={styles.label}>Correo de Contacto:</Text>
      <TextInput
        value={contact}
        onChangeText={setContact}
        placeholder="Ingrese el correo de contacto"
        style={styles.input}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Red Social 1:</Text>
      <Picker
        selectedValue={socialMedia1}
        onValueChange={(itemValue) => setSocialMedia1(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Facebook" value="facebook" />
        <Picker.Item label="X" value="x" />
        <Picker.Item label="Instagram" value="instagram" />
        <Picker.Item label="LinkedIn" value="linkedin" />
      </Picker>
      <Text style={styles.label}>Red Social 2:</Text>
      <Picker
        selectedValue={socialMedia2}
        onValueChange={(itemValue) => setSocialMedia2(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Facebook" value="facebook" />
        <Picker.Item label="X" value="x" />
        <Picker.Item label="Instagram" value="instagram" />
        <Picker.Item label="LinkedIn" value="linkedin" />
      </Picker>
      <Button title="Guardar Proyecto" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
});
