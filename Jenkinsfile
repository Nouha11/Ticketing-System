pipeline {
    agent any

    stages {

        stage('Clean Up') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Code') {
            steps {
                bat 'git clone https://github.com/Nouha11/Ticketing-System.git'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    bat 'echo %DOCKERHUB_TOKEN% | docker login -u %DOCKERHUB_USERNAME% --password-stdin'
                }
            }
        }

        stage('Build API Image') {
            steps {
                dir('Ticketing-System/api') {
                    bat 'dotnet restore TicketingApi.csproj'
                    bat 'dotnet publish TicketingApi.csproj -c Release -o ./publish'
                    bat 'docker build -t nouhah/ticketing-api . --no-cache'
                    bat 'docker push nouhah/ticketing-api'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('Ticketing-System/frontend') {
                    bat 'docker build -t nouhah/ticketing-frontend . --no-cache'
                    bat 'docker push nouhah/ticketing-frontend'
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                dir('Ticketing-System') {
                    bat 'docker compose down --volumes'
                    bat 'docker compose pull'
                    bat 'docker compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
        always {
            bat 'docker logout'
        }
    }
}
