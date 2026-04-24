function escapeJsonForHtml(value) {
  return value
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

module.exports = (req, res) => {
  const payload = {
    type: "PINTEREST_OAUTH_RESULT",
    code: typeof req.query.code === "string" ? req.query.code : undefined,
    state: typeof req.query.state === "string" ? req.query.state : undefined,
    error: typeof req.query.error === "string" ? req.query.error : undefined,
    error_description:
      typeof req.query.error_description === "string" ? req.query.error_description : undefined
  };

  const serializedPayload = escapeJsonForHtml(JSON.stringify(payload));

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Pinterest Authorization</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #f7f7f8;
        color: #111827;
      }
      main {
        width: min(420px, calc(100vw - 32px));
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 14px;
        padding: 24px;
        box-shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
      }
      h1 {
        margin: 0 0 8px;
        font-size: 20px;
        line-height: 1.3;
      }
      p {
        margin: 0;
        color: #4b5563;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Returning to Wix</h1>
      <p>You can close this window if it does not close automatically.</p>
    </main>
    <script>
      (function () {
        var payload = ${serializedPayload};
        try {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(payload, "*");
          }
        } catch (_error) {
          // Ignore cross-window errors and fall back to manual close.
        }
        window.setTimeout(function () {
          window.close();
        }, 150);
      })();
    </script>
  </body>
</html>`);
};
