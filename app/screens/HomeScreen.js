import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore';
import ListProjects from '../components/ListProjects';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: " Login",
      headerTitleStyle: {
        color: "#000",
      },
      headerStyle: {
        backgroundColor: "#000",
      },
      headerTintColor: "#000",
        headerRight: () => (
          <TouchableOpacity onPress={signOutUser} >
            <Text className='text-blue-600 text-lg bg-gray-900 px-4 py-1 rounded-lg'>Sair</Text>
          </TouchableOpacity>
        ),
    });
}, [signOutUser]);

  const auth = getAuth();
  const user = auth.currentUser;

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const username = user.email.split('@')[0];


  return (
    <SafeAreaView className='bg-black h-full'>
      <View className='pt-12 mx-2'>
      <Text className='text-white/80 text-3xl font-semibold'>Olá, {username}!</Text>
      <ListProjects/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
