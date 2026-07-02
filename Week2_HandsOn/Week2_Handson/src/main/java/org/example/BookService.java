package org.example;

public class BookService {

    private BookRepository bookRepository;

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void displayBook() {
        bookRepository.getBookDetails();
        System.out.println("BookService executed using Dependency Injection");
    }
}