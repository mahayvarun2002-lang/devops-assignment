# SIT223/SIT753 DevOps Pipeline with Jenkins Assignment

## 1. Demo Video Link
[Insert Link to your YouTube/Vimeo Demo Video Here]

## 2. GitHub Repository Link
[Insert Link to your GitHub Repository Here]
*(Note: Ensure your Marker and Unit Chair have access permissions)*

## 3. Number of Stages Implemented
**7 Stages (Top HD Level)**: Build, Test, Code Quality, Security, Deploy, Release, Monitoring.

## 4. Project Description & Technologies
This project is a RESTful API built with Node.js and Express. It serves as a backend service managing a task collection (CRUD operations).
The technologies used include:
- **Application**: Node.js, Express
- **Testing**: Jest, Supertest
- **Containerization**: Docker, Docker Compose
- **Pipeline**: Jenkins (Declarative Pipeline)
- **Monitoring**: prom-client (Prometheus metrics)
- **Code Quality & Security**: ESLint, SonarQube (simulated), npm audit, Trivy (simulated)

## 5. Jenkins Pipeline Screenshot
*(Insert a screenshot here showing your Jenkins dashboard with all 7 stages completed successfully in green)*

## 6. Pipeline Stages Description

### Stage 1: Build
- **Description**: This stage installs all Node.js dependencies using `npm install` and builds a Docker image of the application. It tags the image with the current build number to create a unique build artifact.
- **Tools**: npm, Docker

### Stage 2: Test
- **Description**: Executes the automated unit and integration test suite using the Jest framework. Tests cover API endpoints (e.g., `/health`, `/api/tasks`) to ensure the application logic is correct before proceeding.
- **Tools**: Jest, Supertest

### Stage 3: Code Quality
- **Description**: Analyzes the codebase for syntax errors, style issues, and code smells. It runs `eslint` on the JavaScript files and simulates a SonarQube scan that checks against defined quality gates.
- **Tools**: ESLint, SonarQube

### Stage 4: Security
- **Description**: Performs automated security scanning to detect vulnerabilities. It uses `npm audit` to check for insecure dependencies and simulates container scanning (e.g., via Trivy) to ensure the Docker image is secure. Any high-severity issues identified would fail the build.
- **Tools**: npm audit, Trivy

### Stage 5: Deploy
- **Description**: Automatically deploys the application to a staging test environment. It uses Docker Compose to spin up the container in detached mode and then runs a basic `curl` check against the `/health` endpoint to verify the deployment was successful.
- **Tools**: Docker Compose, curl

### Stage 6: Release
- **Description**: Promotes the application to production by creating a formal release artifact. It packages the source code into a `.tar.gz` archive and echoes the successful tagging of the production Docker image.
- **Tools**: tar, Docker

### Stage 7: Monitoring
- **Description**: Configures monitoring integration for the deployed application. It validates that the Prometheus metrics endpoint (`/metrics`) exposed by `prom-client` is active and successfully serving HTTP request duration metrics, ensuring that tools like Datadog or Prometheus can track usage and alert on failures.
- **Tools**: Prometheus (prom-client), curl
