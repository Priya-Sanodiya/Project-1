
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        APP_SERVER = '172.31.9.86'
        APP_USER = 'ubuntu'
        REPO_URL = 'https://github.com/Priya-Sanodiya/Project-1.git'
        REPO_DIR = '/home/ubuntu/Project-1'

        IMAGE_NAME = 'project-1'
        CONTAINER_NAME = 'project-1-container'
        DOCKERFILE = 'dockerfile'
    }

    stages {

        stage('GitHub - Pull Latest Code') {
            steps {
                sshagent(credentials: ['app-server-ssh']) {
                    sh '''
                        ssh ${APP_USER}@${APP_SERVER} "
                            set -e

                            if [ -d ${REPO_DIR}/.git ]; then
                                cd ${REPO_DIR}
                                git fetch origin main
                                git reset --hard origin/main
                            else
                                git clone ${REPO_URL} ${REPO_DIR}
                            fi

                            echo 'Latest GitHub code downloaded'
                            git log -1 --oneline
                        "
                    '''
                }
            }
        }

        stage('Validate Docker Files') {
            steps {
                sshagent(credentials: ['app-server-ssh']) {
                    sh '''
                        ssh ${APP_USER}@${APP_SERVER} "
                            set -e
                            cd ${REPO_DIR}

                            test -f ${DOCKERFILE}
                            test -f nginx.conf
                            test -f next.config.ts

                            echo 'Docker and Nginx configuration found'
                        "
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sshagent(credentials: ['app-server-ssh']) {
                    sh '''
                        ssh ${APP_USER}@${APP_SERVER} "
                            set -e
                            cd ${REPO_DIR}

                            docker build \
                                --pull \
                                -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                                -t ${IMAGE_NAME}:latest \
                                -f ${DOCKERFILE} .

                            echo 'Docker image built successfully'
                        "
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sshagent(credentials: ['app-server-ssh']) {
                    sh '''
                        ssh ${APP_USER}@${APP_SERVER} "
                            set -e

                            docker rm -f ${CONTAINER_NAME} || true

                            docker run -d \
                                --name ${CONTAINER_NAME} \
                                --restart unless-stopped \
                                -p 80:80 \
                                ${IMAGE_NAME}:${BUILD_NUMBER}

                            echo 'Container deployed successfully'
                            docker ps
                        "
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sshagent(credentials: ['app-server-ssh']) {
                    sh '''
                        ssh ${APP_USER}@${APP_SERVER} "
                            set -e

                            docker inspect -f '{{.State.Running}}' \
                                ${CONTAINER_NAME} | grep -qx true

                            curl -fsS http://localhost/ -o /dev/null

                            echo 'Website health check successful'
                        "
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Next.js application deployed!'
        }

        failure {
            echo 'FAILED: Deployment unsuccessful.'
            echo 'Check the Jenkins Console Output.'
        }

        always {
            echo 'CI/CD Pipeline execution completed.'
        }
    }
}
