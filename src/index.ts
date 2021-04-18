import express from 'express'
import bodyParser from 'body-parser'

const app = express();
const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})