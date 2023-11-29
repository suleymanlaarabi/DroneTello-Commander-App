from flask import Flask, request
from flask_cors import CORS
from utils.useRouteValue import useRouteValue

from djitellopy import Tello

tello = Tello()
tello.connect()
tello.takeoff()

app = Flask(__name__)
CORS(app)  

@app.route('/avancer/<int:value>', methods=['GET'])
def avancer(value):
    tello.move_forward(value)
    return useRouteValue(value)

@app.route('/reculer/<int:value>', methods=['GET'])
def reculer(value):
    tello.move_back(value)
    return useRouteValue(value)

@app.route('/droite/<int:value>', methods=['GET'])
def droite(value):
    tello.move_right(value)
    return useRouteValue(value)

@app.route('/gauche/<int:value>', methods=['GET'])
def gauche(value):
    tello.move_left(value)
    return useRouteValue(value)

@app.route('/haut/<int:value>', methods=['GET'])
def haut(value):
    tello.move_up(value)
    return useRouteValue(value)

@app.route('/bas/<int:value>', methods=['GET'])
def bas(value):
    tello.move_down(value)
    return useRouteValue(value)

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=6173)
