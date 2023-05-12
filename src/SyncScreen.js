import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { storage, ref, getDownloadURL } from './firebaseConfig';

const SyncScreen = ({ route, navigation }) => {
  const { userId } = route.params;

  useEffect(() => {
    const loadData = async () => {
      try {
        // Obtener los datos del archivo "grupos.json"
        const gruposResponse = await getDownloadURL(ref(storage, 'grupos.json'));
        const gruposData = await fetch(gruposResponse);
        const gruposJson = await gruposData.json();

        // Filtrar los grupos que coincidan con el userId
        const filteredGrupos = gruposJson.filter(item => item.groupId === userId);

        // Obtener los valores del "pensum.json" para los grupos filtrados
        const pensumResponse = await getDownloadURL(ref(storage, 'pensum.json'));
        const pensumData = await fetch(pensumResponse);
        const pensumJson = await pensumData.json();

        // Filtrar los valores del "pensum.json" para los grupos filtrados y extraer los campos "name" y "description"
        const filteredPensum = pensumJson
          .filter(item => filteredGrupos.some(grupo => grupo.pensum.includes(item.id)))
          .map(item => ({ id: item.id, name: item.name, description: item.description }));

        // Almacenar los valores filtrados en SecureStore
        await SecureStore.setItemAsync('coursesData', JSON.stringify(filteredPensum));

        console.log('Datos cargados desde Firebase Storage y almacenados localmente.');
        console.log('Información almacenada localmente:', filteredPensum);
        console.log(userId);

        alert('Sincronización Éxitosa');
        navigation.navigate('Inicio', { filteredPensum });

      } catch (error) {
        console.log('Error al cargar los datos desde Firebase Storage:', error);
      }
    };

    loadData();
  }, []);

};

export default SyncScreen;
