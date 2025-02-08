# serializers.py
from rest_framework import serializers
from .models import BankAccount, Transaction, ChatSession, ChatMessage

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['id', 'account_number', 'balance']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'account', 'transaction_type', 'amount', 'timestamp']
        read_only_fields = ['timestamp']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Transaction amount must be greater than 0")
        return value

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'session', 'message', 'is_bot', 'timestamp']
        read_only_fields = ['timestamp']

class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['id', 'session_id', 'started_at', 'messages']
        read_only_fields = ['session_id', 'started_at']