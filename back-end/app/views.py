from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import jwt,datetime
from rest_framework.decorators import api_view
from rest_framework import status
import requests


class Weathertview(APIView):
    def post(self,request):
        print(request.data['city'])
        city = request.data['city']
        appid ="3cd20e88b451f2f8fa24354cc99740c4"
        URL ="https://api.openweathermap.org/data/2.5/weather"
        PARAMS={'q':city,'appid':appid,'units':'metric'}
        req = requests.get(url=URL,params=PARAMS)
        weather_response=req.json()
        description=weather_response['weather'][0]['description']
        icon=weather_response['weather'][0]['icon']
        temp=weather_response['main']['temp']
        humidity=weather_response['main']['humidity']
        day = datetime.date.today()
        response = Response()
        response.data={'description':description,'icon':icon,'temp':temp,'humidity':humidity,'day':day,'city':city}
        return response


    



 