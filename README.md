# EduPulse Predictive Learning Analytics API

![Pipeline Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-94%25-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)

EduPulse is a predictive learning analytics platform that integrates seamlessly with existing Learning Management Systems (LMS) like Canvas or Moodle. It ingests real-time student engagement data and uses simulated machine learning to flag "at-risk" students on a live teacher dashboard. Additionally, it features a simulated Generative AI engine to automatically create personalized catch-up study paths for struggling students.

This repository was created as part of the **SIT223/753 DevOps Assignment** to demonstrate a fully automated High Distinction (HD) CI/CD pipeline.

## 🚀 The DevOps Pipeline

This project utilizes Jenkins and GitHub to enforce a strict, genuine 7-stage CI/CD pipeline:

1. **Build**: Packages the Node.js application into a versioned Docker image, tagged uniquely with the Git commit hash.
2. **Test**: Executes automated Jest unit and integration tests.
3. **Code Quality**: Enforces strict ESLint style checks and guarantees a minimum of 80% test coverage using Jest coverage reports.
4. **Security**: Scans Node dependencies using `npm audit` and performs a comprehensive OS/library vulnerability scan on the Docker container using **Trivy**.
5. **Deploy**: Automatically deploys the application to a local staging environment using Docker Compose and validates container health.
6. **Release**: Promotes the validated image to a production release tag in Git and exports a secure `.tar` artifact.
7. **Monitoring**: Validates the integration of a live Prometheus metrics `/metrics` endpoint.

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Jenkins** | CI/CD automation pipeline |
| **Node.js & Express** | Backend API runtime environment |
| **Docker & Docker Compose** | Containerization and deployment |
| **Jest & Supertest** | Automated testing and coverage |
| **ESLint** | Static code analysis |
| **Trivy** | Docker image security scanning |
| **Prometheus** | Metrics and monitoring |

## 📦 Running Locally

If you wish to run the EduPulse API locally without Jenkins, you simply need Docker installed:

```bash
# Clone the repository
git clone https://github.com/mahayvarun2002-lang/devops-assignment.git
cd devops-assignment

# Build and start the container in detached mode
docker-compose up -d --build
```

## 📡 API Endpoints

Once deployed, the API runs on `http://localhost:3000`.

- `GET /health` : Returns the health status of the application.
- `GET /api/students` : Returns a list of all students and their engagement scores.
- `GET /api/students/at-risk` : Returns a filtered list of students marked as at-risk.
- `POST /api/students/analyze` : Accepts a student payload and simulates AI analysis.
- `GET /metrics` : Exposes live Prometheus monitoring metrics.
