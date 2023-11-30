from flask import Blueprint
from utils.useRouteValue import useRouteValue
import service.tello as drone

control_route = Blueprint('api', __name__)

@control_route.route('/exectuion/abort', methods=['GET'])
def abort():
    return exit(0)