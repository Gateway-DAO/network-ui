import {
  FinancialTransactionAction,
  FinancialTransactionType,
  My_TransactionsQuery,
} from '@/services/protocol/types';

export const transaction_default: My_TransactionsQuery['myFinancialTransactions'][0] =
  {
    id: '12345',
    createdAt: '2023-10-26T17:10:44Z',
    type: FinancialTransactionType.Withdraw,
    action: FinancialTransactionAction.PdaIssuance,
    value: 0.3,
    transactionId: '12345',
    fee: 0,
    total: 0.3,
  };
