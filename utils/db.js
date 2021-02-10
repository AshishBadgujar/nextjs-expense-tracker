import mongoose from 'mongoose'

function initDB() {
    if (mongoose.connection.readyState) {
        console.log("already connected");
        return
    }
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on('connected', () => {
        console.log("connected to database")
    })
    mongoose.connection.on('error', () => {
        console.log('error connecting')
    })
}

export default initDB
