# ETS Project Build with TypeORM

This project uses **TypeORM** with **Node.js** and is configured to run with **Docker**. Please follow the steps below to get the project up and running on your machine.

## Prerequisites
Before you start, ensure you have the following installed on your laptop:

1. **Node.js** (20x or later)
   - You can download it from [here](https://nodejs.org/en/download/).
   - Verify installation with: `node -v`

2. **npm** 
   - Usually, npm is installed with Node.js. Verify installation with: `npm -v`

3. **Docker**
   - Docker is used to run services in containers. You can download it from [here](https://www.docker.com/get-started).
   - Verify installation with: `docker -v`

4. **Docker Compose**
   - Docker Compose is used for defining and running multi-container Docker applications.
   - Verify installation with: `docker-compose -v`


## Getting Started

### Steps to run this project:

1. Clone the repository:
   ```bash
   git clone https://github.com/ETStraining/ETS-LTD.git
   cd ETS-LTD
   ```
2. Install dependencies
    ```bash
      npm i
   ```
3. Start the services using Docker Compose:
    ```bash
      docker-compose up
   ```
4. Start the application
    ```bash
      npm start
   ```
5. Access the application at `http://localhost:3000`

