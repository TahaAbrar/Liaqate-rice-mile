from django.urls import path

from . import views

urlpatterns = [
    path("api/content/", views.all_content, name="all_content"),
    path("api/content/<str:key>/", views.section_detail, name="section_detail"),
    path("api/content/<str:key>/save/", views.section_save, name="section_save"),
    path("api/products/", views.product_list, name="product_list"),
    path("api/products/<slug:slug>/", views.product_detail, name="product_detail"),
    path("api/products/<slug:slug>/save/", views.product_save, name="product_save"),
    path("api/upload/image/", views.upload_image, name="upload_image"),
    path("api/geocode/", views.geocode_address, name="geocode_address"),
    path("api/geocode/suggest/", views.geocode_suggest, name="geocode_suggest"),
]
