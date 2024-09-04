import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, FlatList, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function DetailsScreen() {
  const [projects, setProjects] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadProjects();
    }, [])
  );

  const loadProjects = async () => {
    try {
      const storedProjects = await AsyncStorage.getItem('projects');
      if (storedProjects !== null) {
        setProjects(JSON.parse(storedProjects));
      }
    } catch (error) {
      console.error('Failed to load projects.', error);
    }
  };

  const handleDelete = async (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    await AsyncStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const renderProjectItem = ({ item }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectInfoContainer}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text>Encargado: {item.manager}</Text>
          <Text>Contacto: {item.contact}</Text>
        </View>
        <View style={styles.socialMediaIcons}>
          {item.socialMedia && item.socialMedia.map((social, index) => (
            <Image
              key={index}
              source={getSocialMediaIcon(social)}
              style={styles.socialMediaIcon}
            />
          ))}
        </View>
      </View>
      <View style={styles.deleteButtonContainer}>
        <Button title="Eliminar" color="#FF3B30" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  const getSocialMediaIcon = (name) => {
    switch (name) {
      case "facebook":
        return require("../../assets/facebook.png");
      case "x":
        return require("../../assets/x.png");
      case "instagram":
        return require("../../assets/instagram.png");
      case "linkedin":
        return require("../../assets/linkedin.png");
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de proyectos de reciclaje</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProjectItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay proyectos registrados.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  projectItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  projectInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectInfo: {
    flex: 1,
    paddingRight: 10, 
  },
  projectName: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  socialMediaIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialMediaIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  deleteButtonContainer: {
    marginTop: 10,
    alignItems: "center", 
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888888",
    fontSize: 16,
  },
});
