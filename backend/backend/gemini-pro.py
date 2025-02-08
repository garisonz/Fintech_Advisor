from google import genai
API_KEY = "AIzaSyCzA5B-j7dySGJf5V7EuNUyE8t5hObaayM";
client = genai.Client(api_key=API_KEY)
response = client.models.generate_content(
    model="gemini-pro", contents="Explain how AI works"
)
print(response.text)