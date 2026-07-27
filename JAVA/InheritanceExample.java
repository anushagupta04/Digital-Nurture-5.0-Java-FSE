// 18. InheritanceExample.java
class Animal {
    void makeSound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    void makeSound() {
        System.out.println("Bark");
    }
}

class InheritanceExample {
    public static void main(String[] args) {
        Animal a = new Animal();
        Dog d = new Dog();

        a.makeSound();
        d.makeSound();
    }
}