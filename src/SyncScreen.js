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

        // Obtener los valores de "modulos.json" para cada grupo filtrado
        const modulesPromises = filteredPensum.map(async item => {
          const modulesResponse = await getDownloadURL(ref(storage, `cursos/${item.id}/modulos.json`));
          const modulesData = await fetch(modulesResponse);
          const modulesJson = await modulesData.json();
          return modulesJson;
        });
        const modulesData = await Promise.all(modulesPromises);

        // Almacenar los valores filtrados en SecureStore
        await SecureStore.setItemAsync('coursesData', JSON.stringify(filteredPensum));
        await SecureStore.setItemAsync('modulesData', JSON.stringify(modulesData));

        
        console.log(userId);
        console.log('Datos cargados desde Firebase Storage y almacenados localmente.');
        console.log('Información almacenada localmente (filteredPensum):', filteredPensum);
        console.log('Información almacenada localmente (modulesData):', modulesData);


        alert('Sincronización Éxitosa');
        navigation.navigate('Inicio', { filteredPensum, modulesData });

      } catch (error) {
        console.log('Error al cargar los datos desde Firebase Storage:', error);
      }
    };

    loadData();
  }, []);

};

export default SyncScreen;
