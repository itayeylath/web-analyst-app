from django.urls import path
from . import views

urlpatterns = [
    path('facebook/data/delete', views.deleteProducts, name="products"),
    path('facebook/new/save', views.new_save_data, name="response"),
    path('facebook/new/sample/<str:webName>', views.new_get_sample, name="response"),
    path('facebook/new/samples/', views.new_get_all_data, name="response"),

]