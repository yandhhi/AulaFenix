import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import data from './hg.json';

const Teorico = () => {
  const [teoria, setTeoria] = useState('');

  useEffect(() => {
    const fetchTeoria = async () => {
      try {
        setTeoria(data.text);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTeoria();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teórico</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HTML source={{ html: teoria }} containerStyle={styles.htmlContainer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  htmlContainer: {
    marginHorizontal: 10,
  },
});

export default Teorico;
