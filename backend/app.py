from flask import Flask, jsonify
from flask_cors import CORS
from data import get_leaderboard
import os

# Flask Setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------
#   ROUTES
# -------------------

# Retrieve philo leaderboard
@app.route('/leaderboard', methods=['GET'])
def publish_leaderboard():
    df = get_leaderboard()

    if df is None:
        return jsonify({"error": "Could not retrieve data"}), 500

    leaderboard_data = df.to_dict(orient='records')
    return jsonify(leaderboard_data)

# Health check — Render uses this to confirm the server is alive
@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "ok"}), 200

# Run server — use PORT env var on Render, fallback to 5000 locally
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)