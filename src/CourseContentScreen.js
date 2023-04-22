import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import coursesData from './courses.json';

const CourseContentScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const data = coursesData.find(course => course.id === courseId);
    if (data) {
      setModules(data.modules);
    }
  }, [courseId]);

  const handleModulePress = () => {
    navigation.navigate('Aprendizaje');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.module} onPress={handleModulePress}>
      <Text style={styles.moduleText}>{item.name}</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  module: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  moduleText: {
    fontSize: 18,
  },
});

export default CourseContentScreen;
