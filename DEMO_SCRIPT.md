# How to Run & Record Your Demo Video

Follow these steps to set up your project in Jenkins and record the 10-minute demo video required for your HD grade.

## Prerequisites
1. You have a GitHub account.
2. You have Jenkins running at `http://localhost:8080`.
3. You have Docker Desktop installed (or Docker running on your system, as the pipeline uses Docker commands). *If you don't have Docker, the `docker build` and `docker-compose up` steps in the Jenkinsfile will fail.*

## Step 1: Push to GitHub
1. Create a new public repository on GitHub called `devops-assignment`.
2. Open a terminal in `C:\Users\Varun\.gemini\antigravity\scratch\devops-assignment`.
3. Run these commands:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Top HD pipeline"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/devops-assignment.git
   git push -u origin main
   ```

## Step 2: Set up Jenkins Pipeline
1. Go to your Jenkins dashboard (`http://localhost:8080`).
2. Click **New Item**, enter a name (e.g., "SIT-DevOps-Pipeline"), select **Pipeline**, and click OK.
3. Scroll down to the **Pipeline** section.
4. Set "Definition" to **Pipeline script from SCM**.
5. Set "SCM" to **Git**.
6. Paste your GitHub repository URL (e.g., `https://github.com/YOUR_USERNAME/devops-assignment.git`).
7. Make sure the branch to build is `*/main`.
8. Script path should be `Jenkinsfile`.
9. Click **Save**.

## Step 3: Record Your Demo Video
Start your screen recording software (e.g., OBS, Zoom, or built-in OS recorder) and follow this script. Keep it under 10 minutes.

### 1. Introduction (1 min)
- Introduce yourself and state your student ID.
- Briefly show the `index.js` and `test.js` files in your code editor to prove you have a functional Node.js REST API with tests.
- Mention you are aiming for the Top HD band by implementing all 7 stages.

### 2. Show the Jenkins Setup (1 min)
- Show your Jenkins Dashboard.
- Open the configuration of your pipeline and show how it is linked to your GitHub repository using the `Jenkinsfile`.

### 3. Run the Pipeline (3 mins)
- Click **Build Now** in Jenkins.
- Open the "Console Output" of the running build.
- **Narrate as it runs**:
  - *"Here it is pulling the code..."*
  - *"Now it's running the Build stage, installing npm packages and building the Docker image."*
  - *"It's running the Test stage using Jest. As you can see, all tests passed."*
  - *"It's running Code Quality checks with ESLint and SonarQube."*
  - *"It's checking for Security vulnerabilities using npm audit."*
  - *"It is now Deploying the app locally using Docker Compose."*
  - *"It is creating a Release artifact."*
  - *"Finally, it is validating the Monitoring setup by hitting the /metrics endpoint."*

### 4. Review the Results (2 mins)
- Go back to the pipeline overview page to show all 7 stages in green (Stage View).
- Take a screenshot of this page right now! You need it for your PDF report.

### 5. Showcase the Deployed App (2 mins)
- Open a new browser tab.
- Go to `http://localhost:3000/health` to show the app is running.
- Go to `http://localhost:3000/api/tasks` to show the REST API returning JSON data.
- Go to `http://localhost:3000/metrics` to show the Prometheus monitoring metrics being exposed.

### 6. Conclusion (1 min)
- Summarize that your pipeline successfully built, tested, scanned, deployed, released, and monitored the application completely automatically.
- Stop recording.

## Step 4: Finalize Submission
1. Upload your video to YouTube (Unlisted) or Deakin Video (Panopto).
2. Open the `REPORT_TEMPLATE.md` file I generated for you.
3. Fill in the video link and GitHub link.
4. Add the screenshot you took in Step 3.4.
5. Export or print that Markdown file as a PDF.
6. Submit the PDF to DeakinSync!
