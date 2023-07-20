pipeline {
    agent any

   

    stages {
        //This stage check's for git and pulls all the required code
        stage('Checkout') {
            steps {
                
                checkout scm
            }
        }
        //checks for main folder and install frontend dependencies and create optimized production build
        stage('Client') {
            steps {
                script {
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm run build'
                    
                }
            }
        }
        //Copy the production build folder to backend public directory
        stage('Copy to Server') {
            steps {
                sh 'rsync -avz build/ backend/public/'
               
            }
        }
       //After receving build folder now its time for installing backend dependencies
        stage('Backend') {
            steps {
                dir('backend') {
                    sh 'npm install --legacy-peer-deps'
                    
                }
            }
        }
        //now at last we are ready to start our application
    
        stage('Start Server') {
            steps {
                dir('backend') {  
                
                 sh 'pm2 start server.js --watch'
                }
             }
        }

    }
}
