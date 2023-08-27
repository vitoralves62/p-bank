import app from "./app.js";

const rote = process.env.BACKEND_ROTE
const port = process.env.BACKEND_PORT || 3005;

app.listen(port, () => {
    console.log(`Listening on port http://${rote}:${port}`)
});
