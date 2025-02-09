# serializers.py
from rest_framework import serializers
from .models import BankAccount, Transaction, ChatSession, ChatMessage

class BankAccountSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    class Meta:
        model = BankAccount
        fields = ["id", "account_number", "balance", "user_id"]

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
    """Serializer for individual chat messages."""
    class Meta:
        model = ChatMessage
        fields = ["id", "session", "message", "is_bot", "timestamp"]
        read_only_fields = ["id", "session", "timestamp"]

class ChatSessionSerializer(serializers.ModelSerializer):
    """Serializer for chat sessions with nested messages."""
    messages = ChatMessageSerializer(many=True, read_only=True)  # Nested messages

    class Meta:
        model = ChatSession
        fields = ["id", "session_id", "user", "account", "started_at", "messages"]
        read_only_fields = ["id", "session_id", "started_at"]