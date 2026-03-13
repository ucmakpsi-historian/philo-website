import gspread
import pandas as pd
from google.oauth2.service_account import Credentials

# Define the required scopes
scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

# Authenticate using the service account file
gc = gspread.service_account(filename='credentials.json', scopes=scopes)

def get_leaderboard():
    # Open the Google Sheet by its name
    try:
        sh = gc.open("AKPSI Philo Week 2026 - NEW")
    except gspread.SpreadsheetNotFound:
        print("Spreadsheet not found. Please check the name and sharing permissions.")
        exit()

    # Select a worksheet
    worksheet = sh.worksheet("Total Points")

    #List headers of the Google Sheets file

    custom_headers = ['Organization','Points']


    data = worksheet.get_all_records(expected_headers=custom_headers)

    # Convert the data into a pandas DataFrame 
    df = pd.DataFrame(data)
    orgs_and_points= df[['Orgs','Total Points']]
    leaderboard = orgs_and_points.sort_values(by='Total Points', ascending=False)


    return leaderboard
        


