from django.db import models


class SiteSection(models.Model):
    """Stores editable CMS sections (banners, heritage, export page, etc.)."""

    key = models.CharField(max_length=100, unique=True)
    data = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["key"]

    def __str__(self):
        return self.key


class Product(models.Model):
    """Rice product catalog — slug matches URL path (e.g. super-basmati)."""

    slug = models.SlugField(max_length=120, unique=True)
    data = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["slug"]

    def __str__(self):
        return self.slug


class Inquiry(models.Model):
    """Bulk quotation / export inquiry submissions from website forms."""

    source = models.CharField(max_length=50)
    contact_name = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    email = models.EmailField()
    country = models.CharField(max_length=200)
    rice_grade = models.CharField(max_length=200)
    quantity = models.CharField(max_length=50)
    message = models.TextField()
    product_slug = models.CharField(max_length=120, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.contact_name} — {self.rice_grade}"
