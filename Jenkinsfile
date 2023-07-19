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
                    def pm2Status = sh(returnStatus: true, script: "pm2 list | grep server.js | wc -l").trim()
                    if (pm2Status.toInteger() == 1) {
                        echo "PM2 process 'server.js' is already running. Stopping..."
                        sh "pm2 stop server.js"
                        echo "Starting PM2 process 'server.js'..."
                        sh "pm2 start ${serverJsPath}"
                    } else {
                        echo "PM2 process 'server.js' is not running. Starting..."
                        sh "pm2 start ${serverJsPath}"
                    }

                    // Wait for the application to start
                    sleep 30 // You may adjust the waiting time based on your application startup time
                }
            }
        }
    }
}
