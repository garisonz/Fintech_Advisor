from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
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