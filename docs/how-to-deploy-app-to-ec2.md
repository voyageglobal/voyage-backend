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

Step 4: Pull the repository
```bash
$ git pull
```

Step 5: Pull docker image from the repository
```bash
$ docker-compose pull
```

Step 5.1 (optional): Make sure .env file contains the correct values

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

Step 7.1 (optional): Apply seeds to the database
[How to apply seed data to external DB](./how-to-apply-seeds-to-external-db.md)