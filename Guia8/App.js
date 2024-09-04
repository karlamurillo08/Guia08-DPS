import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StepsScreen from "./src/screens/StepsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const steps = [
    { step: 1, description: "Separa los materiales reciclables del resto de la basura." },
    { step: 2, description: "Lava los envases antes de reciclarlos." },
    { step: 3, description: "Identifica los contenedores de reciclaje de tu área." },
    { step: 4, description: "Coloca los materiales reciclables en los contenedores correspondientes." },
  ];

  const MainTabs = () => (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Steps">
          {(props) => <StepsScreen {...props} steps={steps} />}
        </Stack.Screen>
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
