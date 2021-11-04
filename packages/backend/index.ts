import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (_, res) => {
  res.status(200).json({
    message: 'what s upppp',
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log('app is running');
});
