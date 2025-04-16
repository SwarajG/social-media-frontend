pipeline {
    agent any

    tools {
        nodejs 'nodejs-22'
    }

    environment {
        // These should be Jenkins credentials (secret text)
        SONARQUBE_HOST_URL = "http://localhost:9000"
        SONARQUBE_AUTH_TOKEN = credentials('jenkins-sonar')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install -g yarn && yarn install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                        def scannerHome = tool 'SonarScanner'
                        withSonarQubeEnv('MySonarQubeServer') {
                            sh """
                                ${scannerHome}/bin/sonar-scanner \
                                  -Dsonar.projectKey=social-media-frontend \
                                  -Dsonar.sources=. \
                                  -Dsonar.host.url=${SONARQUBE_HOST_URL} \
                                  -Dsonar.login=${SONARQUBE_AUTH_TOKEN} \
                                  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                  -Dsonar.exclusions=node_modules/**,coverage/**,**/*.test.js
                            """
                        }
                    }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}