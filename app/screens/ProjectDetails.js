import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const ProjectDetailsScreen = ({ route }) => {
  const { project } = route.params;
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
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className='text-blue-600 text-lg bg-gray-900 px-4 py-1 rounded-lg'>Voltar</Text>
        </TouchableOpacity>
      )
    });
}, [navigation]);
const statusColor = project.status === 'Concluído' ? 'bg-emerald-600/40' : 'bg-blue-600/40';

  return (
    <SafeAreaView className='bg-black h-full'>
        <View className='px-8'>
      <Text className='text-white font-bold text-2xl pt-12'>{project.title}</Text>
      <View className='pt-2'>
      <Text className='text-white/70 text-lg'>{project.desc}</Text>
      </View>
      <View className='flex flex-row justify-between pt-2 pb-2'>
      <Text className='text-white/90 font-semibold text-lg'>Cliente </Text>
      <Text className='text-white/80 text-lg'>{project.clientName}</Text>
      </View>
      <View className='flex flex-row justify-between pt-2 pb-2'>
      <Text className='text-white/90 font-semibold text-lg'>Deadline </Text>
      <Text className='text-white/80 text-lg'>{project.prazo}</Text>
      </View>
      <View className='flex flex-row justify-between pt-2 pb-2'>
      <Text className='text-white/90 font-semibold text-lg'>Orçamento </Text>
      <Text className='text-white/80 text-lg'>R${project.orcamento}</Text>
      </View>
      <View className='flex flex-row justify-between pt-2 pb-2'>
      <Text className='text-white/90 font-semibold text-lg'>Status </Text>
      <View className={` ${statusColor} px-2 pt-1 rounded-lg`}><Text className={`text-white/80 mb-2 text-lg  `}>{project.status}</Text>
</View>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default ProjectDetailsScreen;
