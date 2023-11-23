import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase.js';
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithCredential } from 'firebase/auth';
import GithubLogin from '../components/GithubLogin';
import { Link } from '@react-navigation/native';

const LoginScreen = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('Home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const navigateToRegister = () => {
    navigate('Register'); 
  };

  const handleLogin = async () => {
    await login(email, password);
    console.log('Usuário', email);
  };

  return (
    <SafeAreaView>
      <Text>LoginScreen</Text>
      <TextInput
        placeholderTextColor={'#fff'}
        style={{ padding: 10, marginVertical: 5, backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ padding: 10, marginVertical: 5, backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
        placeholderTextColor="#fff"
        placeholder="Senha"
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button onPress={login} title="Login" />
      <TouchableOpacity onPress={navigateToRegister}><Text>Ainda não tem uma conta?</Text></TouchableOpacity>
       {/* <GithubLogin />  */}
    </SafeAreaView>
  );
};

export default LoginScreen;
