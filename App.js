// App.js
import React, { createContext, useState, useContext } from 'react'; 
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import AddTaskScreen from './AddTaskScreen';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('a-fazer');
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Fazer avaliação do moodle', dueDate: '02/08/2024', completed: false },
    { id: 2, name: 'Limpar a casa do cachorro', dueDate: '10/08/2024', completed: false },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTaskToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTaskDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esta tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            setTasks(tasks.filter(task => task.id !== id));
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => {
      const existingTaskIndex = prevTasks.findIndex(task => task.id === newTask.id);
      if (existingTaskIndex > -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[existingTaskIndex] = newTask;
        return updatedTasks;
      }
      return [...prevTasks, newTask];
    });
  };

  const handleEditTask = (task) => {
    navigation.navigate('AddTask', { handleAddTask, task })
  };

  const renderTasks = (status) => {
    return tasks.filter(task => task.completed === status).map(task => (
      <View key={task.id} style={styles.taskContainer}>
        <TouchableOpacity style={styles.task} onPress={() => handleTaskToggle(task.id)}>
          <CheckBox
            value={task.completed}
            onValueChange={() => handleTaskToggle(task.id)}
          />
          <View style={styles.taskDetails}>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text style={styles.dueDate}>Até dia: {task.dueDate}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editIcon} 
          onPress={() => handleEditTask(task)}
        >
          <Ionicons name="pencil" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => handleTaskDelete(task.id)}
        >
          <Ionicons name="trash-bin-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    ));
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/user.png')} style={styles.userImage} />
        <Text style={styles.headerText}>Oi, Felipe!</Text>
      </View>
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'a-fazer' && styles.activeTabRed]}
          onPress={() => handleTabChange('a-fazer')}
        >
          <Text style={activeTab === 'a-fazer' ? styles.activeTabText : styles.tabText}>A Fazer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'fazendo' && styles.activeTabYellow]}
          onPress={() => handleTabChange('fazendo')}
        >
          <Text style={activeTab === 'fazendo' ? styles.activeTabText : styles.tabText}>Fazendo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feito' && styles.activeTabGreen]}
          onPress={() => handleTabChange('feito')}
        >
          <Text style={activeTab === 'feito' ? styles.activeTabText : styles.tabText}>Feito</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.tasksContainer}>
        {renderTasks(activeTab === 'feito')}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask', { handleAddTask })}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
