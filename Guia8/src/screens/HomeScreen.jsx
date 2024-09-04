import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"; 

const images = [
  {
    id: 1,
    source:
    "https://img.freepik.com/free-vector/organic-ecology-banner-template_23-2148600526.jpg?t=st=1725418834~exp=1725422434~hmac=afb0226a8d5f36dbfa84b40833e41bdecd5ed061faed4823de6c4a91520ad5a0&w=1060",
    description: "Reduce, Reutiliza, Recicla",
    info: "Descubre cómo puedes contribuir al cuidado del medio ambiente con simples acciones en tu hogar.",
  },
  {
    id: 2,
    source:
    "https://img.freepik.com/free-vector/world-environment-day-hand-drawn-flat-sale-webinar_23-2149394706.jpg?t=st=1725418985~exp=1725422585~hmac=cb8e2bd05cf5031622102c43608cb7006bc1951b960dbb9a7812668acd58bc97&w=1060",    
    description: "Reciclaje en tu Comunidad",
    info: "Conoce programas de reciclaje en tu área y participa activamente para mejorar tu entorno.",
  },
];

export default function HomeScreen({ navigation }) {
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

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.bannerTitle}>Bienvenido a Reciclaje Eco</Text>
        <Text style={styles.bannerText}>
          Ayúdanos a cuidar el medio ambiente a través del reciclaje. ¡Únete a nosotros!
        </Text>
        <Button
          title="Ir a detalles"
          onPress={() => navigation.navigate("Details")}
        />
        <Button
          title="Inscribir Proyecto de Reciclaje"
          onPress={() => navigation.navigate('Register')}
        />
      </View>

      <View style={styles.featured}>
        <Text style={styles.featuredTitle}>Destacado</Text>
        {images.map((image) => (
          <TouchableOpacity key={image.id} style={styles.featuredItem}>
            <Image
              style={styles.featuredImage}
              source={{ uri: image.source }}
            />
            <Text style={styles.featuredItemTitle}>{image.description}</Text>
            <Text style={styles.featuredItemText}>{image.info}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={projects}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.projectItem}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectDescription}>{item.description}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: "#CEFF25",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  bannerText: {
    fontSize: 16,
    color: "#000000",
  },
  bannerButton: {
    backgroundColor: "#ffff00",
    fontSize: 16,
    color: "#000000",
  },
  featured: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  featuredItem: {
    marginBottom: 20,
  },
  featuredImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  featuredItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featuredItemText: {
    fontSize: 16,
  },
  projectItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 16,
  },
});
