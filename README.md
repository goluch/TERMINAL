# How to run

For both environments, swagger is available under the /swagger path

## Production

### Generate self-signed certificates

```
mkdir ./Config/cert && openssl req -x509 -out ./Config/cert/localhost.crt -keyout ./Config/cert/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

### Run compose

```
docker compose --env-file .env.sample.local up
```

- Frontend Url: https://localhost
- Backend Url: https://localhost/api

## Development

Development environment supports automatic container sync upon changing application code

### Run compose

```
docker compose -f compose.dev.yaml --env-file .env.sample.local up --watch
```

- Frontend Url: https://localhost:5173
- Backend Url: http://localhost:5006
