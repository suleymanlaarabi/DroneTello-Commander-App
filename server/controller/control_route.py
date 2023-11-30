from flask import Blueprint
from utils.useRouteValue import useRouteValue
import service.tello as drone

control_route = Blueprint('api', __name__)

@control_route.route('/tello/avancer/<int:value>', methods=['GET'])
def avancer(value):
    drone.avancer(value)
    return useRouteValue(value)

@control_route.route('/tello/reculer/<int:value>', methods=['GET'])
def reculer(value):
    drone.reculer(value)
    return useRouteValue(value)

@control_route.route('/tello/droite/<int:value>', methods=['GET'])
def droite(value):
    drone.droite(value)
    return useRouteValue(value)

@control_route.route('/tello/gauche/<int:value>', methods=['GET'])
def gauche(value):
    drone.gauche(value)
    return useRouteValue(value)

@control_route.route('/tello/haut/<int:value>', methods=['GET'])
def haut(value):
    drone.haut(value)
    return useRouteValue(value)

@control_route.route('/tello/bas/<int:value>', methods=['GET'])
def bas(value):
    drone.bas(value)
    return useRouteValue(value)

@control_route.route('/tello/arreter', methods=['GET'])
def arreter():
    drone.arreter()
    return {
        "ok": "ok"
    }

@control_route.route('/tello/demarrer', methods=['GET'])
def demarrer():
    drone.demarrer()
    return {
        "ok": "ok"
    }

@control_route.route('/tello/emergency', methods=['GET'])
def emergency():
    drone.emergency()
    return {
        "ok": "ok"
    }
