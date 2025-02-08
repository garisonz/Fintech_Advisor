const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyCzA5B-j7dySGJf5V7EuNUyE8t5hObaayM";
async function handleAI() {
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const prompt = "Explain how a car works";

const result = await model.generateContent(prompt);
return result.response.text();

}
async function main() {
const tell = await handleAI();
console.log(tell);
}

main();