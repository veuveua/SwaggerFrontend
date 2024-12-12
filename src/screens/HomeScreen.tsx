import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setExpenses, addExpense } from '../redux/expenseSlice';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/Expense';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../axiosConfig';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const [newExpense, setNewExpense] = useState<Expense>({
    id: 0,
    buildingName: '',
    address: '',
    adminName: '',
    phoneNumber: '',
    periodicDate: '',
    identification: '',
    color: '',
    monthlyFee: 0,
    yearlyFee: 0,
    paidFee: 0,
    revision: 0,
    remainderFee: 0,
    expense: 0,
    profit: 0,
    description: ''
  });
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    axiosInstance.get('/maintenances').then(response => {
      dispatch(setExpenses(response.data));
    }).catch(error => {
      console.error("Error fetching expenses:", error);
    });
  }, [dispatch]);

  const handleAddExpense = () => {
    axiosInstance.post('/maintenances', newExpense).then(response => {
      dispatch(addExpense(response.data));
      setNewExpense({
        id: 0,
        buildingName: '',
        address: '',
        adminName: '',
        phoneNumber: '',
        periodicDate: '',
        identification: '',
        color: '',
        monthlyFee: 0,
        yearlyFee: 0,
        paidFee: 0,
        revision: 0,
        remainderFee: 0,
        expense: 0,
        profit: 0,
        description: ''
      });
    });
  };

  const toggleLocked = () => {
    setLocked(!locked);
  };

  const handleLockToggle = (id: number) => {
    console.log(`Toggled lock for expense with id: ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Editing expense with id: ${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <ExpenseList 
        expenses={expenses}
        onLockToggle={handleLockToggle} 
        onEdit={handleEdit} 
      />

      <Text>Lock Durumu: {locked ? 'Kilitli' : 'Açık'}</Text>

      <TextInput
        placeholder="Bina Adı"
        value={newExpense.buildingName}
        onChangeText={(text) => setNewExpense({ ...newExpense, buildingName: text })}
        style={styles.input}
        editable={!locked}
      />
      <TextInput
        placeholder="Adres"
        value={newExpense.address}
        onChangeText={(text) => setNewExpense({ ...newExpense, address: text })}
        style={styles.input}
        editable={!locked}
      />
      <Button title="Ekle" onPress={handleAddExpense} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  lockIcon: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default HomeScreen;
