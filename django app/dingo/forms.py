from django import forms

class AddNewFood(forms.Form):
    naziv = forms.CharField(max_length=20,required=True)
    slika = forms.CharField(max_length=200,required=True)
    komentar = forms.CharField(widget=forms.Textarea(attrs={'rows' : '7', 'cols' : '100'}),required=True)
    cena = forms.CharField(required=True)
    

class AddNewLocation(forms.Form):
    naziv = forms.CharField(max_length=20,required=True)
    slika = forms.CharField(max_length=200,required=True)
    adresa = forms.CharField(max_length=50,required=True)
    telefon = forms.CharField(required=True)


    