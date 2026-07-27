class BytecodeDemo {
    int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        BytecodeDemo obj = new BytecodeDemo();
        int result = obj.add(10, 20);
        System.out.println(result);
    }
}