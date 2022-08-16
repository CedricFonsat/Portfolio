import mongoose from 'mongoose'

const projectShema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Pas de title"]
    },
    subtitle: {
        type: String,
        required: [true, "Pas de sous titre"]
    },
    description: {
        type: String,
        required: [true, "Pas de description"]
    },
    link: {
        type: String,
        required: [true, "Pas de lien"]
    },
    img:{
        type:String,
        default: "blank.png"
    }
})

const projectModel = mongoose.model('projects', projectShema)
export default projectModel