# backend/app.py
from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message
from forms import ContactForm
from models import db, Volunteer
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'  # Or any database you are using
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your_email_password'

# Initialize extensions
db.init_app(app)
mail = Mail(app)

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_involved', methods=['GET', 'POST'])
def get_involved():
    form = ContactForm()
    if form.validate_on_submit():
        volunteer = Volunteer(name=form.name.data, email=form.email.data, phone=form.phone.data, message=form.message.data)
        db.session.add(volunteer)
        db.session.commit()
        send_confirmation_email(form.email.data)
        return redirect(url_for('thank_you'))
    return render_template('get_involved.html', form=form)

@app.route('/thank_you')
def thank_you():
    return render_template('thank_you.html')

@app.route('/contact', methods=['POST'])
def contact():
    # Handling the contact form (either email or phone)
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    send_contact_email(name, email, message)
    return redirect(url_for('thank_you'))

# Send confirmation email after volunteer sign-up
def send_confirmation_email(user_email):
    msg = Message('Thank you for getting involved with True Light',
                  sender='your_email@gmail.com',
                  recipients=[user_email])
    msg.body = 'Thank you for joining our programs. We will get in touch with you soon.'
    mail.send(msg)

# Send contact form email to admin
def send_contact_email(name, email, message):
    msg = Message(f'New message from {name}', sender=email, recipients=['admin_email@example.com'])
    msg.body = f'Name: {name}\nEmail: {email}\nMessage: {message}'
    mail.send(msg)

if __name__ == '__main__':
    app.run(debug=True)
