## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Access Database

Currently, dev/test is using a shared db in [Neon](https://neon.tech). This will eventually change so dev uses the db on the devs machine (and definitely feel free to do this on your own). Regardless, the simplest way to connect to dbs in this project is to use the ```npx drizzle-kit studio``` command. This gives you an extremely user friendly interface into our db. You can also traverse relationships easier through this vs writing SQL and doing the joins by hand.

## Learn More

To learn more about the tech powering this, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Drizzle](https://orm.drizzle.team/) - ORM
- [Drizzle Studio](https://orm.drizzle.team/docs/drizzle-kit-studio) - The easiest way to interact with db
- [Neon](https://neon.tech) - Database provider
- [Vercel](https://vercel.com) - Hosting provider
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
