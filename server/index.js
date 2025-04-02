const express = require('express');
const cors = require('cors');

const app = express();

const Data = require('./data');

const corsOptions = {
  origin: 'https://readme-gen-ai.vercel.app',
};

app.use(express.json());
app.use(cors(corsOptions));

// test api
app.get('/api/test', async (req, res) => {
  res.send('Hello World!');
})


app.get('/api/generate', async (req, res) => {

  const { githubId, repoName, branchName, fileName } = req.query;

  const resp = await Data.getReadme(githubId, repoName, branchName, fileName);

  res.send(resp);

});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
