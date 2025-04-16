pipeline {
    agent any

    tools {
        nodejs 'nodejs-22'
    }

    environment {
        // These should be Jenkins credentials (secret text)
        SONARQUBE_HOST_URL = credentials('sonarqube-host-url')
        SONARQUBE_AUTH_TOKEN = credentials('sonarqube-auth-token')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarQubeServer') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=social-media-frontend \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=${SONARQUBE_HOST_URL} \
                          -Dsonar.login=${SONARQUBE_AUTH_TOKEN} \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                          -Dsonar.exclusions=node_modules/**,coverage/**,**/*.test.js
                    '''
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