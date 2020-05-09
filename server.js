/* eslint-disable */
const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config({ path: './config.env' }); //config file path is set
const app = require('./app');            // express file is set

const DB = process.env.DATABASE.replace(          //method to set database respective to particular user
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;          //selection of port from.env file
app.listen(port, () => {         // server started
  console.log(`App running on port ${port}...`);
});