FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000

# Re-run npm install on every container start, not just at image build time.
# node_modules lives in a separate named volume (see docker-compose.yml) so
# it survives restarts, but that means it can go stale when package.json
# changes without a rebuild — this makes every start self-healing instead
# of requiring a manual `docker volume rm` when that happens.
CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0"]
