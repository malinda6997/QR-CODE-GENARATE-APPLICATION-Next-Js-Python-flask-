pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker stop qr-backend || true'
                    sh 'docker rm qr-backend || true'
                    sh 'docker build -t qr-backend .'
                    sh 'docker run -d -p 5000:5000 --name qr-backend qr-backend'
                }
            }
        }

        stage('Run API Tests with Postman') {
            steps {
                dir('backend') {
                    sh 'sleep 5' // Give time for Flask to start
                    sh 'newman run qr-api-test.postman_collection.json'
                }
            }
        }

        stage('Success Message') {
            steps {
                echo '✅ Deployment & Testing Completed!'
            }
        }
    }
}
