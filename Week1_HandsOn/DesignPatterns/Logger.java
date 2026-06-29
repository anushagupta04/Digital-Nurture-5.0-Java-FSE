class Logger {
    private static Logger instance;

    private Logger() {
        System.out.println("Logger created");
    }

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(String message) {
        System.out.println("LOG: " + message);
    }
}

class Main {
    public static void main(String[] args) {
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("Application started");

        if (logger1 == logger2) {
            System.out.println("Only one Logger instance exists");
        }
    }
}