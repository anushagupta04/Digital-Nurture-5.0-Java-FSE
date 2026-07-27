
// 29. RecordExample.java
import java.util.*;
import java.util.stream.Collectors;

record Person(String name, int age) {
}

class RecordExample {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
                new Person("Anusha", 21),
                new Person("Rahul", 17),
                new Person("Priya", 25));

        System.out.println(people);

        List<Person> adults = people.stream()
                .filter(p -> p.age() >= 18)
                .collect(Collectors.toList());

        System.out.println("Adults: " + adults);
    }
}