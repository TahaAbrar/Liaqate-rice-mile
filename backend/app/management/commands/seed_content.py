from django.core.management.base import BaseCommand

from app.seed import ensure_seeded


class Command(BaseCommand):
    help = "Seed database with default CMS sections and products from seed_data.json"

    def handle(self, *args, **options):
        ensure_seeded()
        self.stdout.write(self.style.SUCCESS("Database seeded successfully."))
