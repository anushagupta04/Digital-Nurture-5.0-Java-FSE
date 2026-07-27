package org.example;

public class Book {

    private String bookName;

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public void display() {
        System.out.println("Book Name: " + bookName);
    }
}