pipeline {
    agent any

    environment {
        IMAGE_NAME = "qr-backend"
        CONTAINER_NAME = "qr-backend"
        PORT = "5000"
    }

    stages {  // <<==== මෙතැන stages block එක එකතු කරන්න
        stage('Clone Code from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/malinda6997/QR-CODE-GENARATE-APPLICATION-Next-Js-Python-flask-'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker stop $CONTAINER_NAME || true'
                    sh 'docker rm $CONTAINER_NAME || true'
                    sh 'docker build -t $IMAGE_NAME .'
                    sh 'docker run -d -p $PORT:$PORT --restart unless-stopped --name $CONTAINER_NAME $IMAGE_NAME'
                }
            }
        }

        stage('Run Postman for API Test') {
            steps {
                dir('backend') {
                    sh 'sleep 5'  // Give Flask app time to boot
                    sh 'newman run qr-api-test.postman_collection.json'
                }
            }
        }

        stage('Success Notification') {
            steps {
                echo "QR Code Generator Backend Deployed Successfully on port $PORT!"
            }
        }
    }  // end of stages block

    post {
        failure {
            echo "Deployment failed. Check error logs above."
        }
    }
}
