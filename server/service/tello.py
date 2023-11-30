from djitellopy import Tello
import time

def connect():
    time.sleep(1)
    print("connect")
    return
    tello.connect()

def demarrer():
    time.sleep(1)
    print("demarrer")
    return
    tello.takeoff()

def arreter():
    time.sleep(1)
    print("arreter")
    return
    tello.land()

def avancer(value):
    time.sleep(1)
    print("avancer")
    return
    tello.move_forward(value)

def reculer(value):
    time.sleep(1)
    print("reculer")
    return
    tello.move_back(value)

def droite(value):
    time.sleep(1)
    print("droite")
    return
    tello.move_right(value)

def gauche(value):
    time.sleep(1)
    print("gauche")
    return
    tello.move_left(value)

def haut(value):
    time.sleep(1)
    print("haut")
    return
    tello.move_up(value)

def bas(value):
    time.sleep(1)
    print("bas")
    return
    tello.move_down(value)

def emergency():
    time.sleep(1)
    print("emergency")
    return
    tello.emergency()