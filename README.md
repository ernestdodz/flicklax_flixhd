
# FlixHD API


Get HLS streams and info from https://flixhd.cc/



Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd src
  npm dev
```


## API Reference

BASE URL = https://flicklax-flixhd.vercel.app
#### Get tmdb details

```
  GET /api/details/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | tmdb id |



#### Get HLS Stream

```
  GET /api/streaming/:id
```





