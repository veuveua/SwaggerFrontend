import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Expense } from '../types/Expense';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ExpenseListProps {
  expenses: Expense[];
  onLockToggle: (id: number) => void;
  onEdit: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const [lockedExpenses, setLockedExpenses] = useState<number[]>([]); // Kilitli olan öğeleri tutmak için

  // Kilit tuşuna basıldığında çalışacak fonksiyon
  const toggleLock = (id: number) => {
    setLockedExpenses((prevState) =>
      prevState.includes(id) ? prevState.filter((expenseId) => expenseId !== id) : [...prevState, id]
    );
  };

  // Renkleri seçmek için 
  const getBackgroundColor = (monthlyFee: number): string => {
    if (monthlyFee < 1000) {
      return 'green';
    } else if (monthlyFee > 1000 && monthlyFee <= 5000) {
      return 'blue';
    } else if (monthlyFee > 5000) {
      return 'red';
    }
    return 'gray'; 
  };

  return (
    <View>
      {expenses.length === 0 ? (
        <Text>Harcamalar bulunamadı.</Text>
      ) : (
        expenses.map((expense) => (
          <View
            key={expense.id}
            style={[
              styles.expenseItem,
              { backgroundColor: getBackgroundColor(expense.monthlyFee) },
            ]}
          >
            <Text style={styles.buildingName}>{expense.buildingName}</Text>
            
            {/* Editable TextInputs for each field */}
            <TextInput
              value={expense.address}
              editable={!lockedExpenses.includes(expense.id)}
              style={styles.input}
            />
            <TextInput
              value={expense.adminName}
              editable={!lockedExpenses.includes(expense.id)}
              style={styles.input}
            />
            <TextInput
              value={expense.monthlyFee.toString()}
              editable={!lockedExpenses.includes(expense.id)}
              style={styles.input}
            />
            <TextInput
              value={expense.description}
              editable={!lockedExpenses.includes(expense.id)}
              style={styles.input}
            />

            {/* Lock/Unlock button */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => toggleLock(expense.id)}>
                <Icon
                  name={lockedExpenses.includes(expense.id) ? 'lock' : 'unlock'}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  buildingName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ExpenseList;
