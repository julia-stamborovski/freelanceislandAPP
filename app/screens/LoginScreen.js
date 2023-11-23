import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase.js';
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithCredential } from 'firebase/auth';
import GithubLogin from '../components/GithubLogin';
import { Link, useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Detalhes",
      headerTitleStyle: {
        color: "#000",
      },
      headerStyle: {
        backgroundColor: "#000",
      },
      headerTintColor: "#000",
    });
}, [navigation]);
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('Home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };



  const handleLogin = async () => {
    await login(email, password);
    console.log('Usuário', email);
  };

  return (
    <SafeAreaView className='bg-black h-full'>
      <View className='mx-5 pt-12'>
      <Text className='text-white text-4xl font-bold'>freelanceisland</Text>
      <Text className='text-white/80 mb-4 text-2xl'>Onde todos são chefes da praia e não há crachás de tubarões! 🏝️💼</Text>
      <Text className='text-white/50 font-bold text-xl mb-3'>Login</Text>
      <TextInput
        placeholderTextColor={'#fff'}
        className='py-1 px-2 bg-black border-white border rounded-md text-white/60 text-lg mb-5'
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        className='py-1 px-2 bg-black border-white border rounded-md text-white/60 text-lg'
        placeholderTextColor="#fff"
        placeholder="Senha"
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text className='text-white/80 text-right mt-2 text-md'>Ainda não tem uma conta?</Text></TouchableOpacity>

      <Button onPress={login} title="Entrar" />
      
       {/* <GithubLogin />  */}</View>
    </SafeAreaView>
  );
};

export default LoginScreen;
