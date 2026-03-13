# philo-website
Repository for the philanthropy website


Link to Andrew's Public repository featuring all the photos + html:

https://github.com/aw-reed/philo-website-2024

Requirements:

Google Sheets API used -> Install the Google client library

> python3 -m pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
> pip install gspread 

.gitignore hides credentials.json!!!

To create your own credential.json, fill out all the proper details (you can get it by setting up a Google Service Account that utilizes 
Google Drive API)

{
  "type": "service_account",
  "project_id": "YOUR ID",
  "private_key_id": "YOUR PRIVATE ID",
  "private_key": "YOUR PRIVATE KEY",
  "client_email": "YOUR CLIENT EMAIL",
  "client_id": "YOUR CLIENT ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/philo-333%40amazing-pipe-403500.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

