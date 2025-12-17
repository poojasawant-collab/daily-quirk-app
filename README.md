Daily Quirks
=============

A tiny static web app that returns a quirky, deterministic message for the current day when you press the button.

Files created
- index.html
- style.css
- app.js

Run

Open `index.html` in a browser, or serve the folder with a simple HTTP server:

\`\`\`bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000 in your browser
\`\`\`

Behavior
- Messages are chosen deterministically per day (so everyone sees the same message for that date on their machine).
- Press the button to show the message for today.

Want anything else?
- Make messages user-editable
- Show a new quirky message each press (non-deterministic)
- Add sharing or daily notifications
