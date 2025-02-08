from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import BankAccount, Transaction, ChatSession, ChatMessage
from .serializers import BankAccountSerializer, TransactionSerializer, ChatSessionSerializer, ChatMessageSerializer
from django.conf import settings
import google.generativeai as genai
from .models import BankAccount, Transaction, ChatSession, ChatMessage
from .serializers import (
    BankAccountSerializer, 
    TransactionSerializer, 
    ChatSessionSerializer,
    ChatMessageSerializer
)

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

class BaseViewSet(viewsets.ModelViewSet):
    """Base viewset with common functionality"""
    def get_object_or_404(self, pk):
        return get_object_or_404(self.queryset, pk=pk)

class BankAccountViewSet(BaseViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

class TransactionViewSet(BaseViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

# If the user sends a message, it saves it in the database.
# The AI generates a response using Gemini.
# The AI response is saved in the database.
# The API returns both the user message and AI response.

class ChatSessionViewSet(BaseViewSet):
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        """Handle sending messages in a chat session"""
        session = self.get_object_or_404(pk)
        user_message = request.data.get('message', '')

        if not user_message:
            return Response(
                {'error': 'Message content is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save user message
        user_chat = ChatMessage.objects.create(
            session=session,
            message=user_message,
            is_bot=False
        )

        try:
            # Generate AI response using Gemini
            ai_response = self._generate_ai_response(user_message)
            
            # Save bot message
            bot_chat = ChatMessage.objects.create(
                session=session,
                message=ai_response,
                is_bot=True
            )
            
            return Response({
                'user_message': ChatMessageSerializer(user_chat).data,
                'bot_response': ChatMessageSerializer(bot_chat).data
            })
            
        except Exception as e:
            return Response(
                {'error': f'Failed to generate response: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _generate_ai_response(self, user_message: str) -> str:
        """Generate AI response using Gemini API"""
        try:
            # Set up the context for the bank assistant
            prompt = f"""You are a Truist Bank virtual assistant. 
            Please respond professionally to the following inquiry: {user_message}"""
            
            response = model.generate_content(prompt)
            
            # Extract and return the text response
            return response.text if response.text else "I apologize, but I'm unable to process your request right now."
            
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")

class ChatMessageViewSet(BaseViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user = request.user

    accounts = BankAccount.objects.filter(user=user)
    transactions = Transaction.objects.filter(account__user=user)
    chat_sessions = ChatSession.objects.filter(user=user)

    accounts_data = BankAccountSerializer(accounts, many=True).data
    transactions_data = TransactionSerializer(transactions, many=True).data
    chat_sessions_data = ChatSessionSerializer(chat_sessions, many=True).data

    return Response({
        "accounts": accounts_data,
        "transactions": transactions_data,
        "chat_sessions": chat_sessions_data,
    })