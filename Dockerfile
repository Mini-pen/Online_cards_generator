# ---- build the rollup bundle referenced by index.html as `build/…` ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json rollup.config.js ./
RUN npm ci --no-audit --no-fund
COPY src ./src
RUN npm run build

# ---- serve the static site with nginx ----
FROM nginx:alpine
# index.html (inline CSS) + AGPL source, minus dev cruft (see .dockerignore)
COPY . /usr/share/nginx/html/
# freshly built bundle on top
COPY --from=build /app/build /usr/share/nginx/html/build
