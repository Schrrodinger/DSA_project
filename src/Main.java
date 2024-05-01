import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // Transactions: person1 owes person2 an amount
        double[][] transactions = {
                {0, 1, 10},  // Person 0 owes Person 1 $10
                {1, 2, 5},   // Person 1 owes Person 2 $5
                {2, 0, 7}    // Person 2 owes Person 0 $7
        };

        minimizeCashFlow(transactions);
    }

    public static void minimizeCashFlow(double[][] transactions) {
        Map<Integer, Double> balance = new HashMap<>();

        // Calculate net balance for each person
        for (double[] transaction : transactions) {
            int lender = (int) transaction[0];
            int borrower = (int) transaction[1];
            double amount = transaction[2];

            balance.put(lender, balance.getOrDefault(lender, 0.0) - amount);
            balance.put(borrower, balance.getOrDefault(borrower, 0.0) + amount);
        }

        // Simplify debts
        simplifyDebts(balance);
    }

    private static void simplifyDebts(Map<Integer, Double> balance) {
        while (!balance.isEmpty()) {
            int creditor = getMaxCredit(balance);
            int debtor = getMaxDebt(balance);

            double minFlow = Math.min(-balance.get(debtor), balance.get(creditor));
            System.out.println("Person " + debtor + " pays " + minFlow + " to Person " + creditor);

            // Adjust balances
            double debtorNewBalance = balance.get(debtor) + minFlow;
            double creditorNewBalance = balance.get(creditor) - minFlow;

            if (Math.abs(debtorNewBalance) < 0.01) balance.remove(debtor);
            else balance.put(debtor, debtorNewBalance);

            if (Math.abs(creditorNewBalance) < 0.01) balance.remove(creditor);
            else balance.put(creditor, creditorNewBalance);
        }
    }

    private static int getMaxCredit(Map<Integer, Double> balance) {
        return balance.entrySet().stream()
                .filter(e -> e.getValue() > 0)
                .max(Map.Entry.comparingByValue())
                .get()
                .getKey();
    }

    private static int getMaxDebt(Map<Integer, Double> balance) {
        return balance.entrySet().stream()
                .filter(e -> e.getValue() < 0)
                .max((e1, e2) -> Double.compare(Math.abs(e1.getValue()), Math.abs(e2.getValue())))
                .get()
                .getKey();
    }
}
