docker-compose down

# Build backend image
docker build -t backend:latest ./backend

# Build frontend image
docker build -t frontend:latest ./frontend

# Start environment
docker-compose up --build --force-recreate --remove-orphans