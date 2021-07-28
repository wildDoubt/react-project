const express = require('express');

const app = express();

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 5000;
app.listen(port);

app.use((req, res, next) => {
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(express.static('../build'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
