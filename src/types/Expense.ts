// src/types/Expense.ts

import { ReactNode } from "react";

export interface Expense {
    [x: string]: ReactNode;
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
    locked?: boolean;  // Kilit durumu (isteğe bağlı)
  }
  