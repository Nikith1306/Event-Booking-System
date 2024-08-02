import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/eventbooking')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
