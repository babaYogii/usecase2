pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')        
    }

    stages {
        //This stage check's for git and pulls all the required code
        stage('Checkout') {
            steps {
                echo "Checking scm for Jenkinsfile"
                checkout scm
            }
        }
        //checks for main folder and install frontend dependencies and create optimized production build
        stage('Client') {
            steps {
                script {
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm run build'
                    echo 'Frontend package installation completed'
                }
            }
        }
        //Copy the production build folder to backend public directory
        stage('Copy to Server') {
            steps {
                sh 'rsync -avz build/ backend/public/'
                echo 'copied build folder to bakcend directory'
            }
        }
       //After receving build folder now its time for installing backend dependencies
       stage('Backend') {
            steps {
                dir('backend') {
                    sh 'npm install --legacy-peer-deps'
                    echo 'Backend package installation completed'
                }
            }
        }
        //now at last we are ready to start our application
        stage('start server') {
            steps {
                dir('backend') {
                    sh 'pm2 restart server.js'
                    echo 'Application started at your assigned port'
                }
            }
        }
    }
}
