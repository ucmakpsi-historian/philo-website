import gspread
import pandas as pd
from google.oauth2.service_account import Credentials
import os
import json

# Define the required scopes
scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

def get_client():
    creds_env = os.environ.get("GOOGLE_CREDENTIALS_JSON")
    if creds_env:
        # Running on Render — load from environment variable
        creds_dict = json.loads(creds_env)
        creds = Credentials.from_service_account_info(creds_dict, scopes=scopes)
    else:
        # Running locally — load from file
        creds = Credentials.from_service_account_file('credentials.json', scopes=scopes)
    return gspread.authorize(creds)

def get_leaderboard():
    try:
        gc = get_client()
        sh = gc.open("AKPSI Philo Week 2026 - NEW")
        worksheet = sh.worksheet("Total Points")

        # Get raw rows — avoids any header detection issues
        all_values = worksheet.get_all_values()
        headers = all_values[0]
        print("Headers found:", headers)

        # Find column indexes for 'Orgs' and 'Total Points'
        try:
            orgs_col   = headers.index('Orgs')
            points_col = headers.index('Total Points')
        except ValueError as e:
            print(f"Column not found: {e}")
            print("Available headers:", headers)
            return None

        # Build records from data rows (skip header)
        data = []
        for row in all_values[1:]:
            org_name   = row[orgs_col].strip()   if orgs_col   < len(row) else ""
            points_raw = row[points_col].strip()  if points_col < len(row) else "0"

            if not org_name:
                continue  # skip blank rows

            try:
                points = int(points_raw.replace(',', '').replace(' ', '') or 0)
            except ValueError:
                points = 0

            data.append({"Orgs": org_name, "Total Points": points})

        df = pd.DataFrame(data)
        leaderboard = df.sort_values(by='Total Points', ascending=False).reset_index(drop=True)
        print(f"Leaderboard loaded: {len(leaderboard)} orgs")
        return leaderboard

    except gspread.SpreadsheetNotFound:
        print("Spreadsheet not found. Check the name and sharing permissions.")
        return None
    except Exception as e:
        print(f"Error fetching leaderboard: {e}")
        return None