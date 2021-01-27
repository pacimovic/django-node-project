import os
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.conf import settings
from .models import Food, Location
from django.core.files.storage import FileSystemStorage
from django.contrib import messages
from .forms import AddNewFood,AddNewLocation
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required, permission_required


# Create your views here.

def index(request):
    locations = Location.objects.all()
    foods = Food.objects.all()
    return render(request,"index.html",{'foods' : foods , 'locations' : locations})


def search(request):
    
    foods=Food.objects.all()
    
    newFoods=[]
    search=request.GET["search"]
    if(search!=""): 
        for food in foods:
            if(food.naziv.lower()==search.lower()):
                newFoods.append(food)
        foods=newFoods 
        if not foods:
            messages.info(request,'Food not find!') 

    return render(request,"index.html",{'foods' : foods})


#@login_required
def detail(request, detail):
    food = get_object_or_404(Food, id=detail)
        
    return render(request,"detail.html",{'food':food})


#@permission_required('domaci.add_food')
def add(request):        
    if(request.method=='POST'):

        form = AddNewFood(request.POST)

        if form.is_valid():
            naziv=form.cleaned_data['naziv']
            slika=form.cleaned_data['slika']
            komentar=form.cleaned_data['komentar']
            cena=form.cleaned_data['cena']
            ocena=0

            try:
                pass
                tmp = int(cena)
            except ValueError:
                messages.info(request,'Mora Broj!')
                return render(request,"add.html",{'form':form})
            else:
                cena=tmp
                #fs=FileSystemStorage()
                #fs.save(img.name,img)

                newFood=Food(naziv=naziv,slika=slika,komentar=komentar,cena=cena,ocena=ocena)
                newFood.save()
            
            messages.info(request,'Food created successful!')
            return redirect('/')
        else:
            #nije validna forma
            messages.info(request,'nije validna forma')
            return render(request,"add.html",{'form':form})
    else:
        form = AddNewFood()
        return render(request,"add.html",{'form':form})


def addLocation(request):        
    if(request.method=='POST'):

        form = AddNewLocation(request.POST)

        if form.is_valid():
            naziv=form.cleaned_data['naziv']
            slika=form.cleaned_data['slika']
            adresa=form.cleaned_data['adresa']
            telefon=form.cleaned_data['telefon']

            newLocation=Location(naziv=naziv,slika=slika,adresa=adresa,telefon=telefon)
            newLocation.save()
            
            messages.info(request,'Location created successful!')
            return redirect('/')
        else:
            #nije validna forma
            messages.info(request,'nije validna forma')
            return render(request,"add.html",{'form':form})
    else:
        form = AddNewLocation()
        return render(request,"addLocation.html",{'form':form})


#@permission_required('domaci.delete_food')
def delete(request, id):
    food = get_object_or_404(Food, id=id)
    if food is not None:
        food.delete()
    return redirect('/')


def deleteLocation(request, id):
    location = get_object_or_404(Location, id=id)
    if location is not None:
        location.delete()
    return redirect('/')

