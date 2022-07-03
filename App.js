import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import EntryApp from './EntryApp.jsx';
// styles
import styleApp from './styles/styleApp.js';

export default function App() {
  return (

    <SafeAreaView style={styleApp.container}>
      <StatusBar style="light" />
      <EntryApp />
    </SafeAreaView>
  );
}

