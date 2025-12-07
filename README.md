# DevOps Final Project: ToDo API

This is a multi-container web application (Node.js + MongoDB) deployed using DevOps best practices: Docker, Kubernetes, and CI/CD pipelines.

## 🏗 Architecture

* **API Service**: Node.js (Express) REST API
* **Database**: MongoDB (v6.0)
* **Orchestration**: Docker Compose (local dev), Kubernetes (production simulation)
* **CI/CD**: GitHub Actions (Automatic testing and building)

## 🚀 Prerequisites

* Docker Desktop (with Kubernetes enabled) or Minikube
* Node.js (optional, for local development)

## 🛠 How to Run

### Method 1: Docker Compose (Recommended for Testing)

Runs the API, MongoDB, and Mongo-Express admin panel.

```bash
docker-compose up -d --build
```

* **API Healthcheck**: [http://localhost:3000/health](http://localhost:3000/health)
* **Mongo Admin**: [http://localhost:8081](http://localhost:8081) (Login: admin / Password: pass)

To stop:

```bash
docker-compose down
```

### Method 2: Kubernetes

Deploys 2 replicas of the API and a MongoDB instance.

1. Build the image locally (required for local k8s clusters like Docker Desktop/Minikube):

```bash
docker build -t todo-app:latest .
```

2. Apply manifests:

```bash
kubectl apply -f k8s/
```

3. Verify deployment:

```bash
kubectl get pods
```

4. Access the App:

    * **Docker Desktop**: [http://localhost:30001/health](http://localhost:30001/health)
    * **Minikube**: Run `minikube service api-service --url` to get the URL

5. To delete:

```bash
kubectl delete -f k8s/
```

## ✅ Testing

* Unit tests are implemented using **Jest** and **Supertest**.
* Run locally:

```bash
npm test
```

* Tests are automatically executed via GitHub Actions on every push/PR to `main`.

## 📡 API Endpoints

* `GET /health` - Check service status
* `GET /todos` - Get list of tasks
* `POST /todos` - Create a new task

Body example:

```json
{ "title": "Buy milk" }
```
