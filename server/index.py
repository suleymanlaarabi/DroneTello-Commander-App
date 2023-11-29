from flask import Flask, request
from flask_cors import CORS
from utils.useRouteValue import useRouteValue
from controller.control_route import control_route
from service.tello import connect

connect()
app = Flask(__name__)
CORS(app)  

app.register_blueprint(control_route)


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=6173)
