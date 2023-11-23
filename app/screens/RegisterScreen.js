import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { TextInput, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';

const Register =  ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <SafeAreaView>
      <Text>Register</Text>
      <Text>Email:</Text>
      <TextInput type="email" value={email} onChangeText={(text) => setEmail(text)}
 />
      <Text>Password:</Text>
      <TextInput type="password" value={password} onChangeText={(text) => setPassword(text)}
/>
      <TouchableOpacity onPress={handleRegister}>
        <Text>
            Cadastrar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
