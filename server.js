import { createServer } from "http";
import next from "next";
import { initSocket } from "./src/lib/socket.js";

// Windows + OneDrive often breaks Turbopack junctions (os error 5).
// Force Webpack dev server for reliability.
process.env.NEXT_DISABLE_TURBOPACK ??= "1";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  // 🔥 Init socket
  initSocket(server);

  server.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});