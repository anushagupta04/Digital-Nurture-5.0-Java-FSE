
// 21. CustomExceptionExample.java
import java.util.Scanner;

class InvalidAgeException extends Exception {
    InvalidAgeException(String message) {
        super(message);
    }
}

class CustomExceptionExample {
    static void checkAge(int age) throws InvalidAgeException {
        if (age < 18)
            throw new InvalidAgeException("Age must be 18 or above.");
        else
            System.out.println("Valid age.");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        try {
            System.out.print("Enter age: ");
            int age = sc.nextInt();
            checkAge(age);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
}