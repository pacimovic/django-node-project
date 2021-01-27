from django.urls import path,re_path
from . import views

urlpatterns = [
    path("",views.index,name="index"),
    path("search",views.search,name="search"),
    path("add",views.add,name="add"),
    path("addLocation",views.addLocation,name="addLocation"),
    re_path(r'^delete/(?P<id>[0-9]+)/$', views.delete, name='delete'),
    re_path(r'^deleteLocation/(?P<id>[0-9]+)/$', views.deleteLocation, name='deleteLocation'),
    re_path(r'^(?P<detail>[0-9]+)/$', views.detail, name='detail')
    ]