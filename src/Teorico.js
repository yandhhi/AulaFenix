import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useRoute } from '@react-navigation/native';

const Teorico = () => {
  const route = useRoute();
  const teoria = route.params?.teoria;
  const text = teoria[0].text; // Acceder al valor de text

  return (
    <WebView
      style={styles.container}
      containerStyle={styles.webViewContainer}
      contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
      originWhitelist={['*']}
      source={{
        html: `
          <style>
            /* Agregar estilos personalizados aquí */
            body {
              font-size: 45px;
            }
            img {
              max-width: 80%;
              height: auto;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
          </style>
          ${text}
        `
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webViewContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Teorico;
