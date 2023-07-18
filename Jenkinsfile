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
                    def pm2Status = sh(script: 'pm2 list | grep server.js | wc -l', returnStdout: true).trim()
                    if (pm2Status.toInteger() == 1) {
                        echo "PM2 process 'server.js' is already running. Reloading..."
                        sh 'pm2 reload server.js'
                    } else {
                        echo "PM2 process 'server.js' is not running. Starting..."
                        sh 'pm2 start server.js'
                    }
                }
            }
        }
    }
}
