from flask import Blueprint
from utils.useRouteValue import useRouteValue
import service.tello as drone

control_route = Blueprint('api', __name__)

@control_route.route('/avancer/<int:value>', methods=['GET'])
def avancer(value):
    drone.avancer()
    return useRouteValue(value)

@control_route.route('/reculer/<int:value>', methods=['GET'])
def reculer(value):
    drone.reculer()
    return useRouteValue(value)

@control_route.route('/droite/<int:value>', methods=['GET'])
def droite(value):
    drone.droite()
    return useRouteValue(value)

@control_route.route('/gauche/<int:value>', methods=['GET'])
def gauche(value):
    drone.gauche()
    return useRouteValue(value)

@control_route.route('/haut/<int:value>', methods=['GET'])
def haut(value):
    drone.haut()
    return useRouteValue(value)

@control_route.route('/bas/<int:value>', methods=['GET'])
def bas(value):
    drone.bas()
    return useRouteValue(value)

@control_route.route('/arreter', methods=['GET'])
def arreter():
    drone.arreter()
    return {
        "ok": "ok"
    }

@control_route.route('/demarrer', methods=['GET'])
def demarrer():
    drone.demarrer()
    return {
        "ok": "ok"
    }
