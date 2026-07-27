import java.sql.*;

class BasicJDBCConnection {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb";
        String user = "root";
        String password = "anusha07";

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(url, user, password);

            Statement st = con.createStatement();

            ResultSet rs = st.executeQuery("SELECT * FROM students");

            while (rs.next()) {

                System.out.println(
                        rs.getInt("id") + " " +
                                rs.getString("name"));
            }

            con.close();

        } catch (Exception e) {

            System.out.println(e);

        }
    }
}