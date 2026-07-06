from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Inquiry",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("source", models.CharField(max_length=50)),
                ("contact_name", models.CharField(max_length=200)),
                ("company_name", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=254)),
                ("country", models.CharField(max_length=200)),
                ("rice_grade", models.CharField(max_length=200)),
                ("quantity", models.CharField(max_length=50)),
                ("message", models.TextField()),
                ("product_slug", models.CharField(blank=True, default="", max_length=120)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
