from flask import Flask, jsonify, request
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory

app = Flask(__name__,static_folder='movie-recommender-app/build',static_url_path='/')
@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/predict', methods=['POST'])
def predict():
    # Get the user's mood from the request
    mood = request.json['mood']

    # Load the movie dataset
    df = pd.read_csv('main_data.csv')

    # Preprocess the data
    tfidf = TfidfVectorizer(stop_words='english')
    df['genres'] = df['genres'].fillna('')
    tfidf_matrix = tfidf.fit_transform(df['genres'])

    # Compute the cosine similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Get the indices of the top 10 movies similar to the user's mood
    indices = pd.Series(df.index)
    recommended_movies = []
    idx = indices[indices == mood].index[0]
    score_series = pd.Series(cosine_sim[idx]).sort_values(ascending = False)
    top_10_indices = list(score_series.iloc[1:11].index)
    for i in top_10_indices:
        recommended_movies.append(df['movie_title'].iloc[i])

    # Return the recommended movies as a JSON response
    response = {'movies': recommended_movies}
    return jsonify(response)