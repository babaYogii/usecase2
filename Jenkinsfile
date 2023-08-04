// pipeline {
//     agent any

   

//     stages {
//         //This stage check's for git and pulls all the required code
//         stage('Checkout') {
//             steps {
                
//                 checkout scm
//             }
//         }
//         //checks for main folder and install frontend dependencies and create optimized production build
//         stage('Client') {
//             steps {
//                 script {
//                     sh 'npm install --legacy-peer-deps'
//                     sh 'npm run build'
//                 }
//             }
//         }
//         //Copy the production build folder to backend public directory
//         stage('Copy to Server') {
//             steps {
//                 sh 'rsync -avz build/ backend/public/'
               
//             }
//         }
//        //After receving build folder now its time for installing backend dependencies
//         stage('Backend') {
//             steps {
//                 dir('backend') {
//                     sh 'npm install --legacy-peer-deps'
                    
//                 }
//             }
//         }
//         //now at last we are ready to start our application
//         //minikube service main-app-service --url
//         stage('Start Server') {
//             steps {
//                 dir('backend') {  
                
//                  sh 'pm2 restart server.js  -f'
//                 }
//              }
//         }

//     }
// }


pipeline {
	agent any

	environment {
    	registry = "usecase2.azurecr.io/"
	}

	stages {
    	stage('Checkout') {
        	steps {
            	checkout scm
        	}
    	}

    	stage('Build Images') {
        	steps {
            	dir('Client') {
                	sh 'docker build -t $usecase2.azurecr.io/wishmasterfrontend .'
            	}
            	dir('EventService') {
                	sh 'docker build -t usecase2.azurecr.io/eventservice .'
            	}
            	dir('AdminFunctionalites') {
                	sh 'docker build -t usecase2.azurecr.io/adminservice .'
            	}
            	dir('AuthService') {
                	sh 'docker build -t usecase2.azurecr.io/authservice .'
            	}
            	
        	}
    	}

    	stage('Push Images to ACR') {
        	steps {
            	withCredentials([usernamePassword(credentialsId: 'jenkins-azure-bridge', usernameVariable: 'ACR_USERNAME', passwordVariable: 'ACR_PASSWORD')]) {
                	sh "docker login -u $ACR_USERNAME -p $ACR_PASSWORD usecase2.azurecr.io"
                	sh "docker push usecase2.azurecr.io/wishmasterfrontend"
                	sh "docker push usecase2.azurecr.io/eventservice"
                	sh "docker push usecase2.azurecr.io/adminservice"
                	sh "docker push usecase2.azurecr.io/authservice"
            	}
        	}
    	}

    	stage('Deploy to AKS') {
        	steps {
            	script {
                	// Retrieve AKS credentials
                	sh "az aks get-credentials --resource-group Usecase2 --name kubecluster --overwrite-existing"

                	// Apply Kubernetes manifests
                	sh "kubectl apply -f microservices.yaml"
            	}
        	}
    	}
	}
}
