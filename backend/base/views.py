from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import time, json, asyncio, aiohttp
from .models import Facebook, Google, Twitter, Cnet, Amazon, AddWebsite

# GET request to website 
@api_view(['GET'])
def new_get_sample(request,webName):
    url="https://www."+webName+".com/"
    rec_time = asyncio.run(measureTime(url))
    response = rec_time
    return Response(response)

# Measure Time of request to web.
async def measureTime(url):
    start_time = time.time()
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            await response.text()
    end_time = time.time()
    result = end_time - start_time
    return result
# Facebook requests
# Facebook POST request for saving array of sampels. ***
@api_view(['POST'])
def facebook_save_data(request):
    try:
        data=json.loads(request.body)
        for i in data["arr"]:
            data=Facebook(responseTime=i)
            data.save()
        return Response("Data saved successfully.")
    except:
        print("Failed to save data")
        return Response("Failed to save data.")

# Facebook GET request to DB for all samples. ***
@api_view(['GET'])
def facebook_get_all_data(request):
    data = Facebook.objects.all()
    dataArr= []
    for i in data:
        dataArr.append(i.responseTime)
    response = dataArr
    return Response(response)
# Facebook DELETE DB. ***
@api_view(['DELETE','GET'])
def facebook_deleteProducts(request):
    products=Facebook.objects.all().delete()
    return Response(products)

# Add web requests
# Addweb POST request for saving array of sampels. ***
@api_view(['POST'])
def addweb_save_data(request):
    try:
        data=json.loads(request.body)
        for i in data["arr"]:
            data=AddWebsite(responseTime=i)
            data.save()
        return Response("Data saved successfully.")
    except:
        print("Failed to save data")
        return Response("Failed to save data.")

# Addweb GET request to DB for all samples. ***
@api_view(['GET'])
def addweb_get_all_data(request):
    data = AddWebsite.objects.all()
    dataArr= []
    for i in data:
        dataArr.append(i.responseTime)
    response = dataArr
    return Response(response)

# Addweb DELETE DB. ***
@api_view(['DELETE','GET'])
def addweb_deleteProducts(request):
    products=AddWebsite.objects.all().delete()
    return Response(products)

# Google requests
# Google POST request for saving array of sampels. ***
@api_view(['POST'])
def google_save_data(request):
    try:
        data=json.loads(request.body)
        for i in data["arr"]:
            data=Google(responseTime=i)
            data.save()
        return Response("Data saved successfully.")
    except:
        print("Failed to save data")
        return Response("Failed to save data.")

# Google GET request to DB for all samples. ***
@api_view(['GET'])
def google_get_all_data(request):
    data = Google.objects.all()
    dataArr= []
    for i in data:
        dataArr.append(i.responseTime)
    response = dataArr
    return Response(response)
# Google DELETE DB. ***
@api_view(['DELETE','GET'])
def google_deleteProducts(request):
    products=Google.objects.all().delete()
    return Response(products)

# Twitter requests
# Twitter POST request for saving array of sampels. ***
@api_view(['POST'])
def twitter_save_data(request):
    try:
        data=json.loads(request.body)
        for i in data["arr"]:
            data=Twitter(responseTime=i)
            data.save()
        return Response("Data saved successfully.")
    except:
        print("Failed to save data")
        return Response("Failed to save data.")

# Twitter GET request to DB for all samples. ***
@api_view(['GET'])
def twitter_get_all_data(request):
    data = Twitter.objects.all()
    dataArr= []
    for i in data:
        dataArr.append(i.responseTime)
    response = dataArr
    return Response(response)
# Twitter DELETE DB. ***
@api_view(['DELETE','GET'])
def twitter_deleteProducts(request):
    products=Twitter.objects.all().delete()
    return Response(products)

# Cnet requests
# Cnet POST request for saving array of sampels. ***
@api_view(['POST'])
def cnet_save_data(request):
    try:
        data=json.loads(request.body)
        for i in data["arr"]:
            data=Cnet(responseTime=i)
            data.save()
        return Response("Data saved successfully.")
    except:
        print("Failed to save data")
        return Response("Failed to save data.")

# Cnet GET request to DB for all samples. ***
@api_view(['GET'])
def cnet_get_all_data(request):
    data = Cnet.objects.all()
    dataArr= []
    for i in data:
        dataArr.append(i.responseTime)
    response = dataArr
    return Response(response)
# Cnet DELETE DB. ***
@api_view(['DELETE','GET'])
def cnet_deleteProducts(request):
    products=Cnet.objects.all().delete()
    return Response(products)

# Amazon requests
# Amazon POST request for saving array of sampels. ***
@api_view(['POST'])
def amazon_save_data(request):
    try:
        data=json.loads(request.body)
        for i in data["arr"]:
            data=Amazon(responseTime=i)
            data.save()
        return Response("Data saved successfully.")
    except:
        print("Failed to save data")
        return Response("Failed to save data.")

# Amazon GET request to DB for all samples. ***
@api_view(['GET'])
def amazon_get_all_data(request):
    data = Amazon.objects.all()
    dataArr= []
    for i in data:
        dataArr.append(i.responseTime)
    response = dataArr
    return Response(response)
# Amazon DELETE DB. ***
@api_view(['DELETE','GET'])
def amazon_deleteProducts(request):
    products=Amazon.objects.all().delete()
    return Response(products)