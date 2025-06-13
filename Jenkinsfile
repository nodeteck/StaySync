pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "staysync"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/nodeteck/StaySync.git' // Replace with your repo
      }
    }

    stage('Build Services') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Start Services') {
      steps {
        sh 'docker-compose up -d'
      }
    }

    stage('Health Check') {
      steps {
        script {
          sh 'sleep 20' // Wait for services to start
          sh 'curl -f http://localhost:8080 || echo "Backend not responding"'
          sh 'curl -f http://localhost:3000 || echo "Frontend not responding"'
        }
      }
    }

    stage('Stop Services') {
      steps {
        sh 'docker-compose down'
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed.'
    }
  }
}
