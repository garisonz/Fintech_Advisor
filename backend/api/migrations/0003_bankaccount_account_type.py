# Generated by Django 5.1.6 on 2025-02-09 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_chatsession_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='bankaccount',
            name='account_type',
            field=models.CharField(choices=[('checking', 'Checking'), ('savings', 'Savings'), ('investment', 'Investment')], default='checking', max_length=20),
        ),
    ]
