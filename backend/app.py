from flask import Flask, jsonify
from flask_cors import CORS
from data import get_leaderboard

#Flask Setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


#-------------------
#   ROUTES
#-------------------

#Retrieve philo leaderboard
@app.route('/leaderboard', methods=['GET'])
def publish_leaderboard():
    df = get_leaderboard()
    
    if df is None:
        return jsonify({"error": "Could not retrieve data"}), 500

    # 2. Convert DataFrame to a dictionary so Flask can jsonify it
    # 'records' orientation is usually best for frontend tables/leaderboards
    leaderboard_data = df.to_dict(orient='records')
    
    return jsonify(leaderboard_data)


# Run server
if __name__ == '__main__':
    app.run(debug=True)
    
