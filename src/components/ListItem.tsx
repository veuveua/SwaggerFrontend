
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense } from '../types/Expense';

type ListItemProps = {
  expense: Expense;
};

const ListItem: React.FC<ListItemProps> = ({ expense }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{expense.buildingName}</Text>
      <Text style={styles.cell}>{expense.address}</Text>
      <Text style={styles.cell}>{expense.monthlyFee}</Text>
      <Text style={styles.cell}>{expense.yearlyFee}</Text>
      <Text style={styles.cell}>{expense.paidFee}</Text>
      <Text style={styles.cell}>{expense.remainderFee}</Text>
      <Text style={styles.cell}>{expense.expense}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    borderRightWidth: 1, 
    borderRightColor: '#ddd', 
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
    borderLeftWidth: 1, 
    borderLeftColor: '#ddd', 
  },
});

export default ListItem;
