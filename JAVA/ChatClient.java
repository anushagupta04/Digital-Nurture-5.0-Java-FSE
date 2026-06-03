import java.io.*;
import java.net.*;

class ChatClient {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 5000);

            BufferedReader serverInput = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            BufferedReader keyboard = new BufferedReader(
                    new InputStreamReader(System.in));

            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            String clientMessage, serverMessage;

            while (true) {
                System.out.print("Client: ");
                clientMessage = keyboard.readLine();
                output.println(clientMessage);

                if (clientMessage.equalsIgnoreCase("bye")) {
                    break;
                }

                serverMessage = serverInput.readLine();
                if (serverMessage.equalsIgnoreCase("bye")) {
                    System.out.println("Server ended chat.");
                    break;
                }

                System.out.println("Server: " + serverMessage);
            }

            socket.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}