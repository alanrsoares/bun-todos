# Example fullstack app with Bun, Elysia, Turso & HTMX

## Features

- Tailwind for styling
- CVA abstraction for styled components with typescript, on the server
- Drizzle ORM

## Requirements

Before you can run this project, you'll need to set up a few things:

- A SQLite database using [Turso](https://turso.tech).
- An account with [Clerk](https://clerk.com). This service will handle authentication for this application.

Once you have these set up, create a new file named `.env.local` based on the `.env.example` file and add the credentials given by both services.

## Install Dependencies

```
bun install
```

## Database Setup

Before starting the server, you need to set up the database. Run the following commands:

```
bun drizzle:up
bun drizzle:push
```

## Development

To start the development server run:

```
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
