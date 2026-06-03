
// 22. FileWriting.java
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

class FileWriting {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        try {
            System.out.print("Enter text: ");
            String text = sc.nextLine();

            FileWriter fw = new FileWriter("output.txt");
            fw.write(text);
            fw.close();

            System.out.println("Data written to output.txt");
        } catch (IOException e) {
            System.out.println("File error occurred.");
        }
    }
}