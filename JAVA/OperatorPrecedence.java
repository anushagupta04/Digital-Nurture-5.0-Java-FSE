// 8. OperatorPrecedence.java
class OperatorPrecedence {
    public static void main(String[] args) {
        int result = 10 + 5 * 2;
        int result2 = (10 + 5) * 2;

        System.out.println("10 + 5 * 2 = " + result);
        System.out.println("(10 + 5) * 2 = " + result2);

        System.out.println("Multiplication is done before addition.");
    }
}