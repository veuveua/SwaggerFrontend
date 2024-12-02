import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Expense {
  id: number;
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

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
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
              { backgroundColor: getBackgroundColor(expense.monthlyFee) }
            ]}
          >
            <Text>{expense.buildingName}</Text>
            <Text>{expense.description}</Text>
            {/* Diğer bilgiler */}
          </View>
        ))
      )}
    </View>
  );
};

const getBackgroundColor = (monthlyFee: number): string => {
  if (monthlyFee < 1000) return 'green';
  if (monthlyFee >= 1000 && monthlyFee <= 5000) return 'red';
  return 'blue';
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 10,
    marginVertical: 5,
  },
});

export default ExpenseList;
