import java.sql.*;

class StudentDAO {

    Connection con;

    StudentDAO() throws Exception {

        String url = "jdbc:mysql://localhost:3306/testdb";
        String user = "root";
        String password = "anusha07";

        con = DriverManager.getConnection(url, user, password);
    }

    void insertStudent(int id, String name) throws Exception {

        PreparedStatement ps = con.prepareStatement(
                "INSERT INTO students VALUES (?, ?)");

        ps.setInt(1, id);
        ps.setString(2, name);

        ps.executeUpdate();

        System.out.println("Student inserted successfully");
    }

    void updateStudent(int id, String name) throws Exception {

        PreparedStatement ps = con.prepareStatement(
                "UPDATE students SET name=? WHERE id=?");

        ps.setString(1, name);
        ps.setInt(2, id);

        ps.executeUpdate();

        System.out.println("Student updated successfully");
    }

    public static void main(String[] args) {

        try {

            StudentDAO dao = new StudentDAO();

            dao.insertStudent(103, "Priya");

            dao.updateStudent(103, "Priya Sharma");

            dao.con.close();

        } catch (Exception e) {

            System.out.println(e);

        }
    }
}