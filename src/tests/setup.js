import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env.test' })

before(function (done) {
    this.timeout(10000); 

    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shipnow_test';
    
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(mongoUri)
            .then(() => done())
            .catch((err) => done(err))
    } else {
        done();
    }
});

after(function (done) {
    this.timeout(10000);

    if (mongoose.connection.readyState !== 0) {
        mongoose.connection.dropDatabase()
            .then(() => mongoose.disconnect())
            .then(() => done())
            .catch((err) => done(err))
    } else {
        done()
    }
});