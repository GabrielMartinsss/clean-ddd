# Clean DDD (Domain-driven Design)
An application of an online forum, where a student asks a question that can be answered by another student or teacher. Developed using DDD (Domain-driven Design) concept and Clean Architecture.

## Technology
- language: Typescript

## Architecture
The project architecture follows the principle of DDD (Domain-driven Design) and Clean Architecture, organizing the code into distinct layers:

1. **Domain:**
    - **Entities:** Represent the main business objects.
    - **Aggregates:** Entity Groups that are treated as a single unit.
    - **Repositories:** Interfaces for data persistence operations (in memory for simplification)
2. **Application:**
    - **Use Cases:** They contain application logic and coordinate interaction between the domain and external interfaces. 

## Installation 
For installation and run application tests, follow the instructions:

1. Clone the repository:
```
git clone https://github.com/GabrielMartinsss/clean-ddd
```
2. Go to repository:
```
cd clean-ddd
```
3. Install dependencies:
```
npm install
```
4. Run tests:
```
npm run test
```