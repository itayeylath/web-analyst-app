from django.urls import path
from . import views

urlpatterns = [
    path('<str:webName>/sample/', views.new_get_sample, name="response"),

    path('facebook/delete/', views.facebook_deleteProducts, name="products"),
    path('facebook/save/', views.facebook_save_data, name="response"),
    path('facebook/samples/', views.facebook_get_all_data, name="response"),

    path('google/delete/', views.google_deleteProducts, name="products"),
    path('google/save/', views.google_save_data, name="response"),
    path('google/samples/', views.google_get_all_data, name="response"),

    path('twitter/delete/', views.twitter_deleteProducts, name="products"),
    path('twitter/save/', views.twitter_save_data, name="response"),
    path('twitter/samples/', views.twitter_get_all_data, name="response"),

    path('cnet/delete/', views.cnet_deleteProducts, name="products"),
    path('cnet/save/', views.cnet_save_data, name="response"),
    path('cnet/samples/', views.cnet_get_all_data, name="response"),

    path('amazon/delete/', views.amazon_deleteProducts, name="products"),
    path('amazon/save/', views.amazon_save_data, name="response"),
    path('amazon/samples/', views.amazon_get_all_data, name="response"),

    path('addweb/delete/', views.addweb_deleteProducts, name="products"),
    path('addweb/save/', views.addweb_save_data, name="response"),
    path('addweb/samples/', views.addweb_get_all_data, name="response"),


]