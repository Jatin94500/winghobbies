FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/healthy-basis-475512-v4-28cac9c60b6c.json
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
