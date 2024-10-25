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
          <TableHead className="text-center">Category</TableHead>
          <TableHead>Amount</TableHead>
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
              <TableCell>
                {transaction.category || <p className="text-center">-</p>}
              </TableCell>
              <TableCell>
                {transaction.amount} {currency}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
