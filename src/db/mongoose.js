import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL);

// const me = new User({
//     name: '     Kulbir    ',
//     email: '    xeam.kulbir@gmail.com',
//     age: 32,
//     password: 'phone89'
// })

// me.save().then(() => {
//     console.log("Success!", me)
// }).catch((error) => {
//     console.log("Error!", error)
// })

// const task = new Tasks({
//     description: 'ReactJS/React Native'
// })

// task.save().then(() => {
//     console.log("Success!", task)
// }).catch((error) => {
//     console.log("Error!", error)
// })