# Stage 1: Build app
FROM node:22.17.0-alpine AS builder

WORKDIR /app

# Copy toàn bộ file
COPY . .

# Không cần cài yarn vì đã có sẵn
# RUN npm install -g yarn

# Cài dependencies
RUN yarn install

# Build app với NX (ví dụ app tên pwa-app)
RUN yarn nx build pwa-app

# Stage 2: Serve app bằng nginx
FROM nginx:1.25-alpine

# Copy build output từ NX sang nginx
COPY --from=builder /app/apps/pwa-app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
