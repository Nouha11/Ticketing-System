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
                sh 'git clone https://github.com/Nouha11/Ticketing-System.git'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                    '''
                }
            }
        }

        stage('Build API Image') {
            steps {
                dir('Ticketing-System/api') {
                    sh 'dotnet restore TicketingApi.csproj'
                    sh 'dotnet publish TicketingApi.csproj -c Release -o ./publish'
                    sh 'docker build -t nouhah/ticketing-api . --no-cache'
                    sh 'docker push nouhah/ticketing-api'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('Ticketing-System/frontend') {
                    sh 'docker build -t nouhah/ticketing-frontend . --no-cache'
                    sh 'docker push nouhah/ticketing-frontend'
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                dir('Ticketing-System') {
                    sh 'docker compose down --volumes'
                    sh 'docker compose pull'
                    sh 'docker compose -f docker-compose.yml up -d'
                }
            }
        }
    }
}
