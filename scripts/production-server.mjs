/**
 * Production static server + API proxy (no sudo, no vite preview).
 * Serves dist/ and forwards /api + /media to Django.
 */
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(ROOT, ".env") });

const PUBLIC_PORT = Number(process.env.PUBLIC_PORT || 8010);
const BACKEND_HOST = process.env.BACKEND_HOST || "127.0.0.1";
const BACKEND_PORT = process.env.BACKEND_PORT || "8006";
const BACKEND = `http://${BACKEND_HOST}:${BACKEND_PORT}`;
const DIST = path.join(ROOT, "dist");

const app = express();

function proxyToBackend(req, res) {
  const targetUrl = new URL(req.originalUrl, BACKEND);
  const headers = { ...req.headers, host: targetUrl.host };
  delete headers.connection;

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on("error", (err) => {
    console.error("[proxy]", err.message);
    if (!res.headersSent) {
      res.status(502).json({ error: "Backend unavailable" });
    }
  });

  req.pipe(proxyReq);
}

app.use("/api", proxyToBackend);
app.use("/media", proxyToBackend);

app.use(
  express.static(DIST, {
    index: false,
    maxAge: "1d",
  })
);

app.get("*", (_req, res) => {
  res.sendFile(path.join(DIST, "index.html"));
});

app.listen(PUBLIC_PORT, "0.0.0.0", () => {
  console.log(`Liaqat Rice Mills frontend → http://0.0.0.0:${PUBLIC_PORT}`);
  console.log(`API proxy → ${BACKEND}`);
});
