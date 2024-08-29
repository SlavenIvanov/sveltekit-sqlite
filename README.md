### Dockerfile

https://gist.github.com/AradAlvand/04b2cad14b00e5ffe8ec96a3afbb34fb

1. Build image

```sh
docker build -t sveltekit-sqlite .
```

2. Run docker image

```sh
docker run --name sveltekit-sqlite -p 3000:3000 sveltekit-sqlite
```

3. Push docker image to registry

```sh
docker image push sveltekit-sqlite:latest
```
