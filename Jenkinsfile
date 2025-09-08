pipeline {
  agent any
  environment {
    IMAGE = "yourdockerhubuser/hello-app"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Push Image') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS')]) {
            sh '''
              docker build -t $IMAGE:$BUILD_NUMBER .
              echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
              docker push $IMAGE:$BUILD_NUMBER
            '''
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          sh '''
            kubectl set image deployment/hello-app hello=$IMAGE:$BUILD_NUMBER --record || kubectl apply -f k8s/
            kubectl rollout status deployment/hello-app
          '''
        }
      }
    }
  }
  post {
    success {
      echo "Deployment successful!"
    }
    failure {
      echo "Build failed — check logs."
    }
  }
}
