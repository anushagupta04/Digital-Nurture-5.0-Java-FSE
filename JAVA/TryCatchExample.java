
// 20. TryCatchExample.java
import java.util.Scanner;

class TryCatchExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        try {
            System.out.print("Enter first integer: ");
            int a = sc.nextInt();

            System.out.print("Enter second integer: ");
            int b = sc.nextInt();

            System.out.println("Result = " + (a / b));
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        }
    }
}