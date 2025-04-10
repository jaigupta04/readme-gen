const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });



async function fetchAllFiles(username, repo, branch, path = '') {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`;

  const res = await axios.get(url);

  let results = [];

  for (const item of res.data) {
    if (item.type === 'file') {
      results.push(item.path);
    } else if (item.type === 'dir') {
      const nested = await fetchAllFiles(username, repo, branch, item.path);
      results = results.concat(nested);
    }
  }

  return results;
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

  const botRes = response.text();

  return botRes.replace(/^```markdown\s+([\s\S]*?)\s*```$/, '$1').trim();
}



module.exports = { getReadme, fetchAllFiles }
