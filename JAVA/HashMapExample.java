
// 25. HashMapExample.java
import java.util.HashMap;
import java.util.Scanner;

class HashMapExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HashMap<Integer, String> students = new HashMap<>();

        System.out.print("How many students? ");
        int n = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < n; i++) {
            System.out.print("Enter student ID: ");
            int id = sc.nextInt();
            sc.nextLine();

            System.out.print("Enter student name: ");
            String name = sc.nextLine();

            students.put(id, name);
        }

        System.out.print("Enter ID to search: ");
        int searchId = sc.nextInt();

        if (students.containsKey(searchId)) {
            System.out.println("Student name: " + students.get(searchId));
        } else {
            System.out.println("Student ID not found");
        }
    }
}