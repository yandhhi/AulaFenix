import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { storage, ref, getDownloadURL } from './firebaseConfig';
import * as FileSystem from 'expo-file-system';

const SyncScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();


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

        // Obtener la información teorica y almacenarla en la nueva variable modulesJsonData
        const modulesJsonData = [];
        await Promise.all(
          filteredPensum.map(async pensum => {
            await Promise.all(
              modulesData.map(async modules => {
                await Promise.all(
                  modules.map(async module => {
                    const moduleIdString = module.id.toString();
                    if (moduleIdString.startsWith(pensum.id.toString().substring(0, 4))) {
                      const route = `cursos/${pensum.id}/teoria/${module.id}.json/`;
                      const moduleResponse = await getDownloadURL(ref(storage, route));
                      const moduleData = await fetch(moduleResponse);
                      const moduleJson = await moduleData.json();
                      // Almacenar los valores de moduleJson en SecureStore
                      const moduleKey = `module_${pensum.id}_${module.id}`;
                      await SecureStore.setItemAsync(moduleKey, JSON.stringify(moduleJson));
                      // Almacenar el módulo descargado en modulesJsonData
                      modulesJsonData.push(moduleJson);
                    }
                  })
                );
              })
            );
          })
        );

        // Obtener la información de los Quiz y almacenarla en la nueva variable quizJsonData
        const quizJsonData = [];
        await Promise.all(
          filteredPensum.map(async pensum => {
            await Promise.all(
              modulesData.map(async modules => {
                await Promise.all(
                  modules.map(async module => {
                    const quizIdString = module.id.toString();
                    if (quizIdString.startsWith(pensum.id.toString().substring(0, 4))) {
                      const route = `cursos/${pensum.id}/quiz/${module.id}.json/`;
                      const quizResponse = await getDownloadURL(ref(storage, route));
                      const quizData = await fetch(quizResponse);
                      const quizJson = await quizData.json();
                      // Almacenar los valores de quizJson en SecureStore
                      const moduleKey = `quiz_${pensum.id}_${module.id}`;
                      // Almacenar los valores de moduleJson en AsyncStorage
                      await AsyncStorage.setItem(moduleKey, JSON.stringify(quizJson));
                      // Almacenar el módulo descargado en quizJsonData
                      quizJsonData.push(quizJson);
                    }
                  })
                );
              })
            );
          })
        );
        // Almacenar los valores filtrados en SecureStore
        await SecureStore.setItemAsync('coursesData', JSON.stringify(filteredPensum));
        await SecureStore.setItemAsync('modulesData', JSON.stringify(modulesData));

        const downloadVideos = async () => {
          const videoDirectory = FileSystem.documentDirectory;
        
          // Verificar y crear el directorio principal si no existe
          const dirInfo = await FileSystem.getInfoAsync(videoDirectory);
          if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(videoDirectory, { intermediates: true });
          }
        
          for (const pensum of filteredPensum) {
            for (const modules of modulesData) {
              for (const module of modules) {
                const moduleIdString = module.id.toString();
                if (moduleIdString.startsWith(pensum.id.toString().substring(0, 4))) {
                  const videoFileName = `${pensum.id}_${module.id}.mp4`;
                  const videoFileUri = videoDirectory + videoFileName;
                  const videoRoute = `cursos/${pensum.id}/video/${module.id}.mp4/`;
                  const videoResponse = await getDownloadURL(ref(storage, videoRoute));
        
                  try {
                    // Descargar el video
                    await FileSystem.downloadAsync(videoResponse, videoFileUri);
                    console.log('Video descargado:', videoFileUri);
                  } catch (error) {
                    console.log('Error al descargar el video:', error);
                  }
                }
              }
            }
          }
        };
        
        await downloadVideos();
        
        
        console.log(userId);
        console.log('Datos cargados desde Firebase Storage y almacenados localmente.');
        console.log('Información almacenada localmente (filteredPensum):', filteredPensum);
        console.log('Información almacenada localmente (modulesData):', modulesData);
        console.log('Teoria (modulesjsonData):', modulesJsonData);
        console.log('Quiz (quizJsonData):', quizJsonData);


        alert('Sincronización exitosa');
        navigation.navigate('Inicio', { filteredPensum, modulesData, modulesJsonData, quizJsonData });

        // Almacenar los valores filtrados en Redux
        dispatch(setFilteredPensum(filteredPensum));

        navigation.navigate('Inicio');
      } catch (error) {
        console.log('Error al cargar los datos desde Firebase Storage:', error);
        alert('Error en la sincronización');
      }
    };

    loadData();

  }, []);

  return (
    <View>
      <Text>Componente para cargar datos de forma offline</Text>
    </View>
  );
};

export default SyncScreen;
