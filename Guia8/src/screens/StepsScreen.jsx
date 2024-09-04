import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const StepsScreen = ({ steps, navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace("MainTabs"); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        Paso {steps[currentStep].step}: {steps[currentStep].description}
      </Text>
      <Button
        title={currentStep < steps.length - 1 ? "Siguiente" : "Ir a Inicio"}
        onPress={handleNextStep}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  stepText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default StepsScreen;
