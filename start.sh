docker stop slim-router
docker rm slim-router
docker build -t slim-router .
docker run -d --name slim-router -p 20129:20128 --env-file .env -v slim-router-data:/app/data slim-router
