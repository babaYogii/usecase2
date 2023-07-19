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
                script {
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm run build'
                }
            }
        }
        stage('Copy to Server') {
            steps {
                sh 'rsync -avz build/ backend/public/'
            }
        }
        stage('backend') {
            steps {
                script {
                    def serverJsPath = "${WORKSPACE}/backend/server.js"
                        echo "PM2 process 'server.js' is already running. Reloading..."
                        sh "pm2 reload ${serverJsPath}"
                }
            }
        }
    }
}
