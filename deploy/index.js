const express = require('express');
const path = require('path');

const app = express();

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 4257;

app.use((req, res, next) => {
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
