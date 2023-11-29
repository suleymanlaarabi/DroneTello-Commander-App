from djitellopy import Tello

tello = Tello()

def connect():
    tello.connect()

def demarrer():
    tello.takeoff()

def arreter():
    tello.land()

def avancer():
    tello.move_forward()

def reculer():
    tello.move_back()

def droite():
    tello.move_right()

def gauche():
    tello.move_left()

def haut():
    tello.move_up()

def bas():
    tello.move_down()
