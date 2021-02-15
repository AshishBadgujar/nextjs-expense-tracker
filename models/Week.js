import mongoose from 'mongoose'

const d = new Date(Date.now() - ((new Date().getDay()) * 24 * 60 * 60 * 1000));
const nowd = new Date()

const weekSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    weeks: [
        {
            _id: {
                type: String,
                default: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
                required: false
            },
            days: [
                {
                    _id: { type: Number, default: nowd.getDay(), required: false },
                    total: { type: Number, required: true }
                }
            ]

        }
    ]
})

export default mongoose.models.week || mongoose.model('week', weekSchema)