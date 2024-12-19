# backend/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    phone = db.Column(db.String(20))
    message = db.Column(db.Text)

    def __repr__(self):
        return f'<Volunteer {self.name}>'
