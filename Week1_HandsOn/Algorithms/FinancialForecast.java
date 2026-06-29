package Algorithms;

public class FinancialForecast {

    static double forecast(double currentValue, double growthRate, int years) {
        if (years == 0) {
            return currentValue;
        }
        return forecast(currentValue * (1 + growthRate), growthRate, years - 1);
    }

    public static void main(String[] args) {
        double currentValue = 10000;
        double growthRate = 0.10;
        int years = 5;

        double result = forecast(currentValue, growthRate, years);
        System.out.println("Future Value: " + result);
    }
}