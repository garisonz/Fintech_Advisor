from django.contrib import admin
from .models import BankAccount, Transaction, ChatSession, ChatMessage

@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    list_display = ['account_number', 'balance']
    search_fields = ['account_number']

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['account', 'transaction_type', 'amount', 'timestamp']
    list_filter = ['transaction_type', 'timestamp']
    search_fields = ['account__account_number']

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'started_at']
    list_filter = ['started_at']

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['get_short_message', 'session', 'is_bot', 'timestamp']
    list_filter = ['is_bot', 'timestamp']
    search_fields = ['message']

    def get_short_message(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    get_short_message.short_description = 'Message'