
// 39. ReflectionExample.java
import java.lang.reflect.*;

class Sample {
    public void showMessage() {
        System.out.println("Hello from Reflection");
    }
}

class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("Sample");

        Object obj = cls.getDeclaredConstructor().newInstance();

        Method[] methods = cls.getDeclaredMethods();

        for (Method m : methods) {
            System.out.println("Method: " + m.getName());
        }

        Method method = cls.getDeclaredMethod("showMessage");
        method.invoke(obj);
    }
}