pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
    stages {
        stage('Build') {
            steps {
                dir('front-end')
                {
                    sh 'npm install'
                }
            }
        }
    }
}
