from google import genai
import sheets
from google.genai import Client, types

API_KEY = "AIzaSyCzA5B-j7dySGJf5V7EuNUyE8t5hObaayM";


sys_instruct=sheets.data()
client = genai.Client(api_key=API_KEY)

response = client.models.generate_content(
    model="gemini-2.0-flash",
    config=types.GenerateContentConfig(
        system_instruction=sys_instruct),
    contents=["The client needs help staying on a budget of 2,000,000, how can this be done?"]
)

print(response.text)