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
                    bat 'npm install'
                }
            }
        }
    }
}
