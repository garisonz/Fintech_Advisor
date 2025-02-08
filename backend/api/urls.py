# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'accounts', views.BankAccountViewSet, basename='account')
router.register(r'transactions', views.TransactionViewSet, basename='transaction')
router.register(r'chat-sessions', views.ChatSessionViewSet, basename='chat-session')
router.register(r'messages', views.ChatMessageViewSet, basename='message')

urlpatterns = [
    path('', include(router.urls)),
]