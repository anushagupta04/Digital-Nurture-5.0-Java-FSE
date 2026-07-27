import java.sql.*;

class TransactionHandling {

    static void transferMoney(
            Connection con,
            int fromId,
            int toId,
            double amount) {

        try {

            con.setAutoCommit(false);

            PreparedStatement debit = con.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id = ?");

            debit.setDouble(1, amount);
            debit.setInt(2, fromId);

            debit.executeUpdate();

            PreparedStatement credit = con.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?");

            credit.setDouble(1, amount);
            credit.setInt(2, toId);

            credit.executeUpdate();

            con.commit();

            System.out.println("Money transferred successfully");

        } catch (Exception e) {

            try {

                con.rollback();

                System.out.println("Transaction failed. Rollback done.");

            } catch (Exception ex) {

                System.out.println(ex);

            }
        }
    }

    public static void main(String[] args) {

        try {

            String url = "jdbc:mysql://localhost:3306/testdb";
            String user = "root";
            String password = "anusha07";

            Connection con = DriverManager.getConnection(
                    url,
                    user,
                    password);

            transferMoney(con, 1, 2, 1000);

            con.close();

        } catch (Exception e) {

            System.out.println(e);

        }
    }
}