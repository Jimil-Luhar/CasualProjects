#include <stdio.h>
#include <stdlib.h>
#include <time.h>
// A simple game of guessing.

int main() {
    int number, guess, attempts = 0;
    int lowerBound = 1, upperBound = 100;  // You can adjust the range as per your preference

    // Generate a random number
    srand(time(NULL));
    number = (rand() % (upperBound - lowerBound + 1)) + lowerBound;

    printf("Welcome to Guess the Number Game!\n");
    printf("I have selected a number between %d and %d. Can you guess it?\n", lowerBound, upperBound);

    do {
        printf("Enter your guess: ");
        scanf("%d", &guess);

        attempts++;

        if (guess == number) {
            printf("Congratulations! You guessed the number in %d attempts.\n", attempts);
            break;
        } else if (guess < number) {
            printf("Too low! Try again.\n");
        } else {
            printf("Too high! Try again.\n");
        }
    } while (1);

    return 0;
}
