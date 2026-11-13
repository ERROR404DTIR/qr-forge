QR Forge
========

A lightweight QR code studio for creating, styling and exporting custom QR codes.

Live site: https://error404dtir.github.io/qr-forge/

Features
--------
- URL, plain text, Wi-Fi, email and phone QR codes.
- Live preview and six pattern styles.
- Custom foreground/background colors, transparent background and output size.
- Custom finder markers and quiet zone.
- Center image from local upload, remote URL or a Bootstrap Icon.
- Center image scale and padding controls.
- Four frame styles with custom frame and caption colors.
- PNG and SVG export, plus copy PNG to clipboard where supported.
- Quick color presets and responsive layout.
- No build step, backend, account or analytics.

Run locally
-----------
Open index.html in a modern browser. Bootstrap, Bootstrap Icons, QR Code Styling and web fonts are loaded from public CDNs, so an internet connection is required for the complete experience.

Scanning notes
--------------
Use strong contrast, preserve a quiet zone, use High error correction when adding a center image, and test exported files on multiple devices before printing. Remote image hosts must allow cross-origin access for reliable export. Local uploads are processed in the browser and are not sent to a QR Forge server.

QR Forge uses QR Code Styling for rendering. It is independent and not affiliated with QR Code Styling or Bootstrap.

Deploy
------
GitHub Pages is configured through the Pages workflow. Pushes to main trigger deployment.

License
-------
MIT. See LICENSE.
