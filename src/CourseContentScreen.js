import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CourseContentScreen = ({ navigation }) => {
  const route = useRoute();
  const modulos = route.params?.modulos;
  const courseId = route.params?.courseId;
  const teoria = route.params?.teoria;
  const quiz = route.params?.quiz;
  const [modules, setModules] = useState([]);
  const [filteredTeoria, setFilteredTeoria] = useState([]);
  const [filteredQuiz, setFilteredQuiz] = useState([]);


  useEffect(() => {

    if (courseId && modulos && modulos.length > 0) {
      const courseIdString = courseId.toString();

      const filteredModules = modulos.flatMap(nestedArray =>
        nestedArray.filter(item => item.id && item.id.toString().startsWith(courseIdString.substring(0, 4)))
      );

      setModules(filteredModules);

      const filteredTeoria = teoria.filter(item => {
        const pageId = item.pageid.toString();
        return filteredModules.some(module => module.id.toString() === pageId);
      });

      console.log('Teoria filtrada:', filteredTeoria);
      setFilteredTeoria(filteredTeoria);

    const filteredQuiz = quiz.filter(item => {
        const quizId = item.quizid.toString();
        return filteredModules.some(module => module.id.toString() === quizId);
      });
      console.log('quiz filtrado:', filteredQuiz);
      setFilteredQuiz(filteredQuiz);
    }
  }, [courseId, modulos, teoria, quiz]);

  const handleModulePress = (item) => {
    const selectedTeoria = filteredTeoria.filter(teoriaItem => teoriaItem.pageid.toString() === item.id.toString());
    const selectedQuiz = filteredQuiz.filter(quizItem => quizItem.quizid.toString() === item.id.toString());
    navigation.navigate('Aprendizaje', { teoria: selectedTeoria, quiz: selectedQuiz });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.module} onPress={() => handleModulePress(item)}>
      <Text style={styles.moduleText}>{item.name}</Text>
      <Text style={styles.moduleDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Módulos</Text>
      </View>
      <FlatList
        data={modules}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  module: {
    backgroundColor: '#859bed',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: 40,
  },
  moduleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  moduleDescription: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center'
  }
});

export default CourseContentScreen;
