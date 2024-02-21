# Example fullstack app with Bun, Elysia, Torso & HTMX

## Features

- TailwindCSS for styling
- CVA abstraction for styled components with typescript, on the server
- Drizzle orm

## Development

Requirements:

- Have a [clerk](https://clerk.com) account. It's cree!
- create a `.env.local` file
- set CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY with your own keys
- Have a [turso](https://turso.io) account. Also free!
- set

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Deployment

- Have a [fly.io](https://fly.io) account
- Create an application
- Change the `app name` and `primary region` settings according to your app on `fly.io` [here](/fly.toml)
- Install the [fly cli](https://fly.io/docs/hands-on/install-flyctl/) if you haven't yet
- Login with the `fly cli`:

  ```bash
  fly auth login
  ```

- Set up your env variables as secrets on fly.io. [details here](https://fly.io/docs/reference/secrets/#set-secrets)

- Deploy to `fly.io`:

  ```bash
  fly deploy
  ```

- That's it, you did it 🎉

License: [UNLICENSE](/LICENSE.md)
