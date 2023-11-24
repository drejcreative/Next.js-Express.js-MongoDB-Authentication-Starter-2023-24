import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_AUTH_TEST_URL
        : process.env.MONGO_AUTH_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

const clearDatabaseBeforeTestandConnect = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_AUTH_TEST_URL);
    await database.connection.db.dropDatabase();
    await mongoose.connect(process.env.MONGO_AUTH_TEST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`Cant drop DB: ${error.message}`);
    process.exit(1);
  }
};

const dissconnectDB = async (done) => {
  try {
    await mongoose.disconnect(done);
  } catch (error) {
    console.log(`Error dissconecting to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
export { dissconnectDB, clearDatabaseBeforeTestandConnect };
