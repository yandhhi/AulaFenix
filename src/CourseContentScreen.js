import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
//import { useNavigation, useRoute } from '@react-navigation/native';
import { storage, ref, getDownloadURL } from './firebaseConfig';

const CourseContentScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const modulesRef = ref(storage, `cursos/${courseId}/modulos.json`);

    getDownloadURL(modulesRef)
      .then((url) => fetch(url))
      .then((response) => response.json())
      .then((data) => {
        setModules(data);
      })
      .catch((error) => {
        console.log('Error al obtener los datos de módulos:', error);
      });
  }, [courseId]);

  const handleModulePress = () => {
    navigation.navigate('Aprendizaje');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.module} onPress={handleModulePress}>
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
