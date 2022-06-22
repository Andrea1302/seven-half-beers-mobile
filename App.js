import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button } from 'seven-half-beers'

export default function App() {
  const press = () => {
    console.warn('ciaoooo')
  }
  return (
    <SafeAreaView>
      <Button label="ciao" callback={press} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
