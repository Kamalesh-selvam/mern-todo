# MERN TODO Server

Environment: create a `.env` file from `.env.example`.

Quick start (local MongoDB):

```
cd server
copy .env.example .env
# edit .env to set JWT_SECRET and MONGO_URI (see notes below)
npm install
npm run dev
```

Default server port: `5000`.

Using MongoDB Atlas (cloud):

1. Create a free Atlas cluster at https://www.mongodb.com/cloud/atlas and follow the guided steps.
2. Create a Database User (username/password) in Atlas — save credentials.
3. In "Network Access" add your IP (or 0.0.0.0/0 for testing) so your app can connect.
4. In the Atlas cluster UI, click "Connect" → "Connect your application" and copy the connection string.
	 - Example (replace user, pass and cluster id):
		 ```
		 mongodb+srv://<DB_USER>:<DB_PASS>@cluster0.mongodb.net/mern-todo?retryWrites=true&w=majority
		 ```
5. Update `server/.env` `MONGO_URI` field with the Atlas connection string (URL-encode special characters in password).
6. Restart the server: `npm run dev`.

Notes:
- If you see `ECONNREFUSED` on startup, the `MONGO_URI` likely points to a non-running local MongoDB. Use Atlas or start `mongod` locally.
- For production, never commit `.env` or your Atlas credentials to source control.
