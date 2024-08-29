### Deploying with Kamal

https://gist.github.com/AradAlvand/04b2cad14b00e5ffe8ec96a3afbb34fb

1. Build image

```sh
docker build -t slavenbg/sveltekit-sqlite .
```

2. Run docker image

```sh
docker run --name sveltekit-sqlite -p 3000:3000 slavenbg/sveltekit-sqlite
```

3. Push docker image to registry

```sh
docker image push slavenbg/sveltekit-sqlite:latest
```

4. Setup Kamal dependencies on VPS

```sh
kamal setup
```

5. Use Kamal to deploy

```sh
kamal deploy
```
