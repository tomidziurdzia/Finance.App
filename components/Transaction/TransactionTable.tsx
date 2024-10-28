import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/interfaces/transactionInterface";

interface TransactionTable {
  transactions: Transaction[];
  currency: string;
}

const TransactionTable: React.FC<TransactionTable> = ({
  transactions,
  currency,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const date = new Date(transaction.createdAt);
          return (
            <TableRow key={transaction.id}>
              <TableCell>{date.toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.categoryName || <p>-</p>}</TableCell>
              <TableCell
                className={`${
                  transaction.type.toString() === "Expense" && "text-red-400"
                } ${
                  transaction.type.toString() === "Income" && "text-green-400"
                }`}
              >
                {transaction.amount} {currency}
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
