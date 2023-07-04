from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_manager, LoginManager, login_user
from werkzeug.security import check_password_hash, generate_password_hash
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///React-user-auth.db'
app.config['SECRET_KEY'] = 'secret123!'
db = SQLAlchemy(app)
ma = Marshmallow(app)
login = LoginManager(app)


@app.before_request
def create_tables():
    db.create_all()

@login.user_loader
def load_user(id):
  return User.query.get(int(id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)

    def generate_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    
@app.route('/', methods=['POST'])
def index():

    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(password):
            print("Invalid password or email")
            data = {'error': "Invalid email or password", 'status': 400}
            return data, 400
        else:
            login_user(user)
            print("Logged in!")
            data = {'status': 200, "email": email}
        return data, 200


@app.route('/add', methods=['POST'])
def login():

    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        if db.session.query(db.session.query(User).filter_by(email=email).exists()).scalar():
            data = {"status": 400, "message": "This email is already in use!"}
            return data, 400
        else: 
            user = User(email=email)
            user.generate_password(password)
            db.session.add(user)
            db.session.commit()
            data = {'status': 200, "email": email}
        return data, 200


if __name__ == '__main__':
    app.run()