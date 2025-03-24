const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const fs = require('fs');

require('dotenv').config();


const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

function fileWrite(filePath) {

  fs.readFile(filePath, 'utf8', (err, data) => {
      const lines = data.split('\n');

      if (lines.length > 0) {
          lines.shift(); 
      }
      if (lines.length > 0) {
          lines.pop(); 
      }

      const modifiedContent = lines.join('\n');

      fs.writeFile(filePath, modifiedContent, () => {});
  });

}

async function getGithubFileContents(owner, repo, branch, path) {

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  const response = await axios.get(url);

  const content = Buffer.from(response.data.content, 'base64').toString('utf-8');

  return content;
  
}

async function getReadme(githubId, repoName, branchName, fileName) {

  const fileContent = await getGithubFileContents(githubId, repoName, branchName, fileName)

  const chat = model.startChat(); // Chat session created

  const userInput = `Give markdown code of readme for the following code covering all the function with proper explanation of each function and examples \n ${fileContent}`;

  const result = await chat.sendMessage(userInput);
  const response = await result.response;

  const botRes = response.text()

  // console.log("Bot:", response.text());
  // fs.writeFile('./data/README.md', botRes, () => {});
  // fileWrite('./data/README.md')
  return botRes;
}



module.exports = { getReadme }
