# Gunakan Node.js versi stabil dan ringan
FROM node:20-alpine AS builder

WORKDIR /app

# Salin package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Salin seluruh project
COPY . .

# Build Next.js app
RUN npm run build

# ────────────────
# Production image
# ────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy hasil build dari tahap sebelumnya
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
