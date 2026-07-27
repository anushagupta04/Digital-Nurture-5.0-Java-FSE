import java.io.*;
import java.net.*;

class ChatServer {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(5000);
            System.out.println("Server started. Waiting for client...");

            Socket socket = serverSocket.accept();
            System.out.println("Client connected.");

            BufferedReader clientInput = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            BufferedReader keyboard = new BufferedReader(
                    new InputStreamReader(System.in));

            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            String clientMessage, serverMessage;

            while (true) {
                clientMessage = clientInput.readLine();
                if (clientMessage.equalsIgnoreCase("bye")) {
                    System.out.println("Client ended chat.");
                    break;
                }

                System.out.println("Client: " + clientMessage);

                System.out.print("Server: ");
                serverMessage = keyboard.readLine();
                output.println(serverMessage);

                if (serverMessage.equalsIgnoreCase("bye")) {
                    break;
                }
            }

            socket.close();
            serverSocket.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
