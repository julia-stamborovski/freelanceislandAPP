import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'; // Importe os métodos necessários do Firebase
import Register from './app/screens/RegisterScreen';
import ProjectDetailsScreen from './app/screens/ProjectDetails';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState<User | null>(null); // Defina o tipo do estado como User | null


  useEffect(() => {
    const auth = getAuth(); // Obtenha a instância de autenticação do Firebase

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // O usuário está autenticado
        setUser(authUser);
      } else {
        // O usuário não está autenticado
        setUser(null);
      }
    });

    // Certifique-se de se descadastrar quando o componente for desmontado
    return () => {
      unsubscribe();
    };
  }, []);

  return (
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
              <Stack.Screen
              name="ProjectDetails"
              component={ProjectDetailsScreen}
            />
          </>
        ) : (
          <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
            <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'Register' }}
          />
          </>
        )}
      </Stack.Navigator>
  );
}
