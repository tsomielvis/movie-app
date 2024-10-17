from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# Set the database URI (replace with your actual database settings)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # For SQLite
# For PostgreSQL, use:
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'

# Enable track modifications if needed (optional)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and Flask-Migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Your other imports and app logic here

if __name__ == "__main__":
    app.run()
