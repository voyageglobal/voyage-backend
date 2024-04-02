### How to deploy an app to EC2
Step 1: Rebuild docker image
```bash
# No need to specify the name/tag if it is already in the docker-compose.yml
$ docker-compose build
```

Step 2: Push the image to the repository
```bash
# No need to specify the service/name/tag if it is already in the docker-compose.yml
$ docker-compose push
```

Step 3: SSH into the EC2 instance
```bash
$ ssh -i <PEM_FILE> ec2-user@<EC2_PUBLIC_IP>
```

Step 4: Clone the repository
```bash
$ git clone <YOUR_REPOSITORY_URL>
```

Step 5: Pull docker image from the repository
```bash
$ docker-compose pull
```

Step 6: Run the docker image
```bash
$ docker-compose up -d
```

Step 7: Check the status of docker container
```bash
# To check the status of the container using logs
$ docker-compose logs
# To check the status of the container
$ docker-compose ps
```