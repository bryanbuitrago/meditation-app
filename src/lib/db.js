import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect()
        console.log('Disconnected from the database!');
    } catch (error) {
        console.error('Failed to disconnect from the database', error)
    }
}


export { connectDB, disconnectDB }; 
