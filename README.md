# CappaChat

CappaChat is a user-centric chat application made in 2026 by WEB students Casper, Sam, and Mike under the guidance of the legendary Mr Clarke.

## how to use

[https://chat.cappabot.com](https://chat.cappabot.com)

or you can host it yourself (commands not tested yet)

```bash
deno task build
```

```bash
deno task start
```

make sure to set `DATABASE_URL` and `CAPPACHAT_ADMIN_PASSWORD` in your environment variables (.env in the project root or otherwise)

you'll need to set up a PostgreSQL database and run the commands in ./database-setup to ... y'know ... set up the database...
