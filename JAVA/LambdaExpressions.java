
// 27. LambdaExpressions.java
import java.util.*;

class LambdaExpressions {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();

        names.add("Riya");
        names.add("Anusha");
        names.add("Karan");

        Collections.sort(names, (a, b) -> a.compareTo(b));

        System.out.println(names);
    }
}