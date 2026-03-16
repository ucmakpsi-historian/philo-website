import requests
import pandas as pd
import os

# ── Paste your Apps Script deployment URL here ────────────────────────────────
# Or set APPS_SCRIPT_URL as an environment variable on Render
APPS_SCRIPT_URL = os.environ.get(
    "APPS_SCRIPT_URL",
    "YOUR_APPS_SCRIPT_URL_HERE"  # replace with your URL for local testing
)

def get_leaderboard():
    try:
        response = requests.get(APPS_SCRIPT_URL, allow_redirects=True)
        response.raise_for_status()
        data = response.json()

        df = pd.DataFrame(data)

        if 'Orgs' not in df.columns or 'Total Points' not in df.columns:
            print("Unexpected columns:", df.columns.tolist())
            return None

        leaderboard = df[['Orgs', 'Total Points']].sort_values(
            by='Total Points', ascending=False
        ).reset_index(drop=True)

        return leaderboard

    except Exception as e:
        print(f"Error fetching leaderboard: {e}")
        return None