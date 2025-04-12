const express = require('express');
const cors = require('cors');

const app = express();

const Data = require('./data');
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://readme-gen-ai.vercel.app',
};

app.use(express.json());
app.use(cors(corsOptions));

// test api
app.get('/api/test', async (req, res) => {
  res.send('Hello World!');
})


app.get('/api/branch', async (req, res) => {

  const { githubId, repoName} = req.query;

  const resp = await Data.getBranches(githubId, repoName);

  res.send(resp);
})


app.get('/api/tree', async (req, res) => {

  const { githubId, repoName, branchName} = req.query;

  const resp = await Data.fetchAllFiles(githubId, repoName, branchName);

  res.send(resp);
})


app.get('/api/generate', async (req, res) => {

  const { githubId, repoName, branchName, fileName } = req.query;

  const resp = await Data.getReadme(githubId, repoName, branchName, fileName);

  res.send(resp);

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
