import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Rotas } from './assets/rotas';
import { Login } from './assets/Screens/Login';
import { Inicio } from './assets/Screens/inicio';
import { Loja } from './assets/Screens/Loja';
import CadastroScreen from './assets/Screens/cadastro';
import { SQLiteProvider } from 'expo-sqlite';
import { setupDatabase } from './assets/data/database';
import {AreaLojista} from './assets/Screens/AreaLojista';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <SQLiteProvider databaseName="lojinhas.db" onInit={setupDatabase}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
          <Stack.Screen name="Homepage" component={Rotas} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Loja" component={Loja} options={{ headerShown: false }} />
          <Stack.Screen name="AreaLojista" component={AreaLojista} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
