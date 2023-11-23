import React, { useLayoutEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { TextInput, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const Register = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const register = async (email, password) => {
    if (!email || !password) {
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userDocRef, {
        email: email,
      });
      console.log(user, 'created successfully')
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
    }
  };

  const handleRegister = async () => {
    await register(email, password);
  };
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

  return (
    <SafeAreaView className='bg-black h-full'>
      <View className='mx-5 pt-12'>
        <Text className='text-white text-4xl font-bold'>freelanceisland</Text>
        <Text className='text-white/80 mb-4 text-2xl'>Onde todos são chefes da praia e não há crachás de tubarões! 🏝️💼</Text>
        <Text className='text-white/50 font-bold text-xl mb-3'>Cadastre-se</Text>
        <TextInput className='py-1 px-2 bg-black border-white border rounded-md text-white/60 text-lg mb-5'
        placeholder='Email'
          placeholderTextColor="#fff" type="email" value={email} onChangeText={(text) => setEmail(text)}
        />
        <TextInput className='py-1 px-2 bg-black border-white border rounded-md text-white/60 text-lg' placeholder="Senha"
          textContentType="password"
          placeholderTextColor="#fff" type="password" value={password} onChangeText={(text) => setPassword(text)}         secureTextEntry={true}

        />
         <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text className='text-white/80 text-right mt-2 text-md'>Já tem uma conta?</Text></TouchableOpacity>

        <TouchableOpacity onPress={handleRegister}>
          <Text className='text-blue-500 text-lg text-center pt-10'>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
