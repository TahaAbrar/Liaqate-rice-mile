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
