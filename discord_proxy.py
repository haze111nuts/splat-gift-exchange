from flask import Flask, request, jsonify, send_from_directory
import requests

app = Flask(__name__)
year = "2025"
channel_id = "nope"

BOT_TOKEN = "it's a secret to everybody"
DISCORD_API = "https://discord.com/api/v10"

@app.route(f'/{year}/gift/<path:filename>')
def serve_gift(filename):
    return send_from_directory(f'{year}/gift', filename)

@app.route("/send-message", methods=["POST"])
def send_message():
    content = request.form.get("content")

    # If a file was uploaded, include it
    files = None
    if "file" in request.files:
        file = request.files["file"]
        files = {"file": (file.filename, file.stream, file.mimetype)}

    headers = {
        "Authorization": f"Bot {BOT_TOKEN}"
    }

    payload = {"content": content}

    r = requests.post(
        f"{DISCORD_API}/channels/{channel_id}/messages",
        headers=headers,
        data=payload,
        files=files
    )

    return jsonify(r.json()), r.status_code


if __name__ == "__main__":
    # Allow CORS from your HTML page
    from flask_cors import CORS
    CORS(app)
    app.run(port=8344)