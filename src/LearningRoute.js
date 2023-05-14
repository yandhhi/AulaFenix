import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const LearningRouteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const teoria = route.params?.teoria;
  const quiz = route.params?.quiz;

  const handleTeoria = () => {
    navigation.navigate('Teoria', { teoria });
  };

  const handleVideoLesson = () => {
    navigation.navigate('Videos');
  };

  const handleQuiz = () => {
    navigation.navigate('Quiz', {quiz});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruta de aprendizaje</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleTeoria(teoria)}>
        <Text style={styles.buttonText}>Conceptualización Téorica</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVideoLesson}>
        <Text style={styles.buttonText}>Lección de video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleQuiz}>
        <Text style={styles.buttonText}>Cuestionario</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#859bed',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default LearningRouteScreen;
