// Run with Java 21

class VirtualThreadsExample {
    public static void main(String[] args) throws InterruptedException {
        long start = System.currentTimeMillis();

        for (int i = 1; i <= 100000; i++) {
            int threadNumber = i;

            Thread.startVirtualThread(() -> {
                System.out.println("Virtual Thread running: " + threadNumber);
            });
        }

        Thread.sleep(3000);

        long end = System.currentTimeMillis();

        System.out.println("100000 virtual threads created.");
        System.out.println("Time taken: " + (end - start) + " ms");
    }
}