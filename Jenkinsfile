pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "staysync"
    
    MYSQL_ROOT_PASSWORD = 'root'
    MYSQL_DATABASE = 'staysync_db'

    SPRING_DATASOURCE_URL = 'jdbc:mysql://mysql:3306/staysync_db?createDatabaseIfNotExist=true'
    SPRING_DATASOURCE_USERNAME = 'root'
    SPRING_DATASOURCE_PASSWORD = 'root'
    SPRING_PROFILES_ACTIVE = 'dev'
    SPRING_DEVTOOLS_RESTART_ENABLED = 'true'
    SPRING_DEVTOOLS_LIVERELOAD_ENABLED = 'true'
    JWT_SECRET = '20020709'

    NODE_ENV = 'development'
    CHOKIDAR_USEPOLLING = 'true'
    WATCHPACK_POLLING = 'true'
  
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
