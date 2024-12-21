
import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setExpenses, addExpense } from '../redux/expenseSlice';
import ListItem from '../components/ListItem'; 
import axiosInstance from '../axiosConfig';
import { Expense } from '../types/Expense';

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

  return (
    <View style={styles.container}>
      {/* Tablo Başlıkları */}
      <View style={styles.header}>
        <Text style={styles.cell}>Bina Adı</Text>
        <Text style={styles.cell}>Adres</Text>
        <Text style={styles.cell}>Aylık Ücret</Text>
        <Text style={styles.cell}>Yıllık Ücret</Text>
        <Text style={styles.cell}>Ödenen Ücret</Text>
        <Text style={styles.cell}>Kalan Ücret</Text>
        <Text style={styles.cell}>Gider</Text>
      </View>

      {/* FlatList  */}
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ListItem expense={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <TextInput
        placeholder="Bina Adı"
        value={newExpense.buildingName}
        onChangeText={(text) => setNewExpense({ ...newExpense, buildingName: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Adres"
        value={newExpense.address}
        onChangeText={(text) => setNewExpense({ ...newExpense, address: text })}
        style={styles.input}
      />
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
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRightWidth: 1, // Hücreler arasına kenarlık
    borderRightColor: '#ddd', // Hafif gri renk
    paddingVertical: 5,
  },
});

export default HomeScreen;
