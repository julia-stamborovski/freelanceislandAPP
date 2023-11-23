import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Button, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ListProjects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const fetchProjects = async () => {
    const db = getFirestore();
    const projectsCollection = collection(db, 'projects');
    const q = query(projectsCollection, where('userId', '==', user.uid));

    try {
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const loadClients = async () => {
    try {
      const db = getFirestore();
      const clientCollectionRef = collection(db, 'clients');
      const querySnapshot = await getDocs(query(clientCollectionRef, where('userId', '==', user.uid)));

      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(clientsData);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  useEffect(() => {
    loadClients();
    fetchProjects();
  }, []);

  const getClientNameById = (clientId) => {
    const client = clients.find(client => client.id === clientId);
    return client ? client.name : 'Sem cliente associado';
  };


  const renderActiveItem = ({ item }) => (

    <View className='bg-white/10 rounded-lg mr-2 p-3'
    >
       <TouchableOpacity
      onPress={() => navigation.navigate('ProjectDetails', { project: item })}
   
    >
            <Text className='text-white/90 text-lg'>{item.title}</Text>
            <View className='flex flex-row justify-between'>
            <Text className='text-white/90 pt-2 pb-2'>Status </Text>
            <Text className='text-white/80 pt-2 pb-2'> {item.status}</Text>
            </View>
            <View className='flex flex-row justify-between'>
            <Text className='text-white/90'>Cliente</Text>
            <Text className='text-white/80'>{getClientNameById(item.clientId)}</Text>
            </View>


    </TouchableOpacity>
    
    </View>
  );

  const renderCompletedItem = ({ item }) => (
    <View className='bg-white/10  rounded-lg mr-2 p-3'
    >
       <TouchableOpacity
      onPress={() => navigation.navigate('ProjectDetails', { project: item })}
   
    >
            <Text className='text-white/90 text-lg'>{item.title}</Text>
            <Text className='text-white/80 pt-2 pb-2'>Status: {item.status}</Text>
            <Text className='text-white/80'>Cliente: {getClientNameById(item.clientId)}</Text>


    </TouchableOpacity>
    
    </View>
  );

  return (
    <ScrollView 
    showsHorizontalScrollIndicator={false}
    >
      <View className='pt-12 pb-12'>
        <Text className='text-white/80 text-2xl my-5'>Ativos</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={projects.filter(project => project.status === 'Ativo')}
          renderItem={renderActiveItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
      <View className='pt-12'>
        <Text className='text-white/80 text-2xl my-5'>Concluídos</Text>
        <FlatList
          data={projects.filter(project => project.status === 'Concluído')}
          renderItem={renderCompletedItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
    </ScrollView>
  );
};

export default ListProjects;
