# -------- BUILD STAGE --------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -------- RUN STAGE --------
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/nginx.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# ⚠️ IMPORTANT: copy ONLY dist, not project root
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
