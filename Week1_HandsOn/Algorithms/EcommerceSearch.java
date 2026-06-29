package Algorithms;

class Product {
    int productId;
    String productName;
    String category;

    Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }
}

public class EcommerceSearch {

    static Product linearSearch(Product[] products, String name) {
        for (Product product : products) {
            if (product.productName.equalsIgnoreCase(name)) {
                return product;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Shoes", "Fashion"),
                new Product(103, "Phone", "Electronics")
        };

        Product result = linearSearch(products, "Phone");

        if (result != null) {
            System.out.println(result.productId + " " + result.productName + " " + result.category);
        } else {
            System.out.println("Product not found");
        }
    }
}