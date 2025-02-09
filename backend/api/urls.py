# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import get_bank_accounts_by_user_id, get_transactions_by_user_id, send_message, get_chat_history, start_chat_session, generate_account_summary, create_bank_account

router = DefaultRouter()
router.register(r'accounts', views.BankAccountViewSet, basename='account')
router.register(r'transactions', views.TransactionViewSet, basename='transaction')
router.register(r'chat-sessions', views.ChatSessionViewSet, basename='chat-session')
router.register(r'messages', views.ChatMessageViewSet, basename='message')

urlpatterns = [
    path('', include(router.urls)),
    path('bank-accounts-by-user/', views.get_bank_accounts_by_user_id, name='bank-accounts-by-user'),
    path('transactions-by-user/', views.get_transactions_by_user_id, name='transactions-by-user'),
    path("start/", start_chat_session, name="start_chat"),
    path("send/<uuid:session_id>/", send_message, name="send_message"),
    path("history/<uuid:session_id>/", get_chat_history, name="chat_history"),
    path('account-summary/<int:user_id>/', generate_account_summary, name='account_summary'),
    path('create-bank-account/', create_bank_account, name='create_bank_account'),
]