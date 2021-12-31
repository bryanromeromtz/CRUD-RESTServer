const mongoose = require('mongoose');


const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('online database');

  } catch (error) {
    console.log(error);
    throw new Error('DB Connection Error');
  }
}

module.exports = {
  dbConnection
}

