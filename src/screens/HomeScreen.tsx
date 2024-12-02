import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setExpenses, addExpense } from '../redux/expenseSlice';
import ExpenseList from '../components/ExpenseList';
import axiosInstance from '../axiosConfig';

interface NewExpense {
  buildingName: string;
  address: string;
  adminName: string;
  phoneNumber: string;
  periodicDate: string;
  identification: string;
  color: string;
  monthlyFee: number;
  yearlyFee: number;
  paidFee: number;
  revision: number;
  remainderFee: number;
  expense: number;
  profit: number;
  description: string;
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const [newExpense, setNewExpense] = useState<NewExpense>({
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

  useEffect(() => {
    axiosInstance.get('/maintenances').then(response => {
      console.log(response.data); // Verilerin doğru gelip gelmediğini kontrol edin
      dispatch(setExpenses(response.data));
    }).catch(error => {
      console.error("Error fetching expenses:", error);
    });
  }, [dispatch]);

  const handleAddExpense = () => {
    axiosInstance.post('/maintenances', newExpense).then(response => {
      dispatch(addExpense(response.data));
      setNewExpense({
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

  return (
    <View style={styles.container}>
      <ExpenseList expenses={expenses} />
      <TextInput
        placeholder="Bina Adı"
        value={newExpense.buildingName}
        onChangeText={(text) => setNewExpense({ ...newExpense, buildingName: text })}
        style={styles.input}
      />
      {/* Diğer TextInput bileşenleri */}
      <Button title="Ekle" onPress={handleAddExpense} />
    </View>
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
});

export default HomeScreen;
