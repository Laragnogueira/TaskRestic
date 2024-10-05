import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

const AddTaskScreen = ({ route, navigation }) => {
  const { handleAddTask, task } = route.params; // Obtendo a função e a tarefa (se houver)
  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState('a-fazer'); // Inicialmente 'a-fazer'

  // Efeito para preencher os campos se estiver editando uma tarefa
  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDetails(task.details || ''); // Se não houver detalhes, será uma string vazia
      setDueDate(new Date(task.dueDate)); // Converte a string da data para um objeto Date
      setStatus(task.completed ? 'feito' : 'a-fazer'); // Define o status baseado na tarefa
    }
  }, [task]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const handleAddTaskClick = () => {
    if (taskName.trim() === '') {
      alert('Por favor, insira o nome da tarefa.');
      return;
    }

    const newTask = {
      id: task ? task.id : Math.random(), // Usa o ID da tarefa se estiver editando
      name: taskName,
      details: taskDetails,
      dueDate: dueDate.toLocaleDateString(),
      completed: status === 'feito', // Define se a tarefa está concluída
    };

    handleAddTask(newTask); // Adiciona ou atualiza a tarefa
    navigation.navigate('Home'); // Volta para a tela inicial
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tarefa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da tarefa"
        value={taskName}
        onChangeText={setTaskName}
      />
      <Text style={styles.label}>Detalhes da tarefa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Detalhes"
        multiline
        value={taskDetails}
        onChangeText={setTaskDetails}
      />
      <Text style={styles.label}>Data de vencimento:</Text>
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="DD/MM/AAAA"
          value={dueDate.toLocaleDateString()}
          editable={false}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text style={styles.label}>Marcar como:</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusOption}>
          <CheckBox
            value={status === 'a-fazer'}
            onValueChange={() => setStatus('a-fazer')}
          />
          <Text style={styles.statusText}>A Fazer</Text>
        </View>
        <View style={styles.statusOption}>
          <CheckBox
            value={status === 'fazendo'}
            onValueChange={() => setStatus('fazendo')}
          />
          <Text style={styles.statusText}>Fazendo</Text>
        </View>
        <View style={styles.statusOption}>
          <CheckBox
            value={status === 'feito'}
            onValueChange={() => setStatus('feito')}
          />
          <Text style={styles.statusText}>Feito</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTaskClick}>
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 14,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color:'#000',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#001542', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
