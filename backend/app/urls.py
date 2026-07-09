from django.urls import path

from . import views

urlpatterns = [
    path("api/content/", views.all_content, name="all_content"),
    path("api/content/<str:key>/", views.section_detail, name="section_detail"),
    path("api/content/<str:key>/save/", views.section_save, name="section_save"),
    path("api/products/", views.product_list, name="product_list"),
    path("api/products/create/", views.product_create, name="product_create"),
    path("api/products/<slug:slug>/save/", views.product_save, name="product_save"),
    path("api/products/<slug:slug>/delete/", views.product_delete, name="product_delete"),
    path("api/products/<slug:slug>/", views.product_detail, name="product_detail"),
    path("api/catalog/<str:key>/", views.catalog_list, name="catalog_list"),
    path("api/catalog/<str:key>/save/", views.catalog_save, name="catalog_save"),
    path("api/upload/image/", views.upload_image, name="upload_image"),
    path("api/upload/video/", views.upload_video, name="upload_video"),
    path("api/geocode/", views.geocode_address, name="geocode_address"),
    path("api/geocode/suggest/", views.geocode_suggest, name="geocode_suggest"),
    path("api/inquiries/", views.inquiry_list, name="inquiry_list"),
    path("api/inquiries/create/", views.inquiry_create, name="inquiry_create"),
    path("api/inquiries/<int:pk>/delete/", views.inquiry_delete, name="inquiry_delete"),
    path("api/admin/login/", views.admin_login, name="admin_login"),
]
