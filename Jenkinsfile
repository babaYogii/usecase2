pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')        
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Client') {
            steps {
                {
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm run build'
                }
            }
        }
                stage('Copy to Server') {
            steps {
                sh 'rsync -avz /build/ backend/public/'
            }
        }
        stage('backend') {
            steps {
                dir('backend') {
                    sh 'sudo npm install --legacy-peer-deps'
                    sh 'sudo pm2 start server.js'
                }
            }
        }

       
    }
}
//restart