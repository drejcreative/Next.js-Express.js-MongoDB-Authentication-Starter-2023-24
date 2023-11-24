import app from './app';

const port = process.env.AUTH_PORT || 5000;

app.listen(port, () => console.log(`Auth Server started on port ${port}`));
