from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import time, json, asyncio, aiohttp
from .models import Facebook

# POST request for saving array of sampels.
@api_view(['POST'])
def new_save_data(request):
    try:
        data=json.loads(request.body)
        for i in data["arr"]:
            data=Facebook(responseTime=i)
            data.save()
        return Response("Data saved successfully.")
    except:
        print("Failed to save data")
        return Response("Failed to save data.")
# Measure Time of request to web.
async def measureTime(url):
    start_time = time.time()
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            await response.text()
    end_time = time.time()
    result = end_time - start_time
    return result
# GET request for website
@api_view(['GET'])
def new_get_sample(request,webName):
    url="https://www."+webName+".com/"
    rec_time = asyncio.run(measureTime(url))
    response = rec_time
    return Response(response)
# GET request to DB for all samples.
@api_view(['GET'])
def new_get_all_data(request):
    data = Facebook.objects.all()
    dataArr= []
    for i in data:
        dataArr.append(i.responseTime)
    response = dataArr
    return Response(response)
# Delete DB
#todo: fix syntax
@api_view(['DELETE','GET'])
def deleteProducts(request):
    products=Facebook.objects.all().delete()
    return Response(products)


