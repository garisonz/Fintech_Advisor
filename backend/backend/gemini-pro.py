import google.generativeai as genai

# Set up your API key
API_KEY = "AIzaSyCzA5B-j7dySGJf5V7EuNUyE8t5hObaayM"
genai.configure(api_key=API_KEY)

# Initialize the model
model = genai.GenerativeModel("gemini-pro")

# Generate a response
response = model.generate_content("Explain how AI works")

# Print the response
print(response.text)
