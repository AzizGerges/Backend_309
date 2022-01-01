require("dotenv").config()
const express = require('express')   //the server 

const mongoose = require('mongoose')
const res = require('express/lib/response')

const bodyparser = require('body-parser')

require('./models/users')



const app =express()


// mongoose.connect("mongodb://localhost:27017/users")  //to conect the local server 
// .then(()=>console.log("connexted db"))
// .catch((error) => console.log(error))


const User = mongoose.model('User')


mongoose.connect(process.env.MONGODBURI)  //to conect the cloud server 
.then(()=>console.log("connexted to atlas"))
.catch((error) => console.log(error))







const database = {

    users : [
        {
            id : "1",
            name : "Abdo",
            password : "123456",
            email : "abdo@gmail.com"

        }


    ]
}

app.get('/',(req,res)=>{        //home end point 
    res.send('server is run ')
})

app.post('/singup', async (req,res)=>{
    const {name , password , email} = req.body

    const newuser = new User ({
        name : name,
        password : password,
        email : email
    })


    try{
    const result = await newuser.save()
    res.status(201).json(result)
    }catch{
        res.status(400).json(error)
    }

    // database.users.push({
    //    // id : "1",
    //     name :req.body.name ,
    //     password :req.body.password ,
    //     email : req.body.email
    // })

    //res.json('success')
    res.json(database.users[database.users.length - 1 ])    // last user 
})

app.post('/login', async (req,res)=>{  // login end point
   // res.json("login") 


   const userEmail = await User.findOne({
       email : req.body.email

   })
   console.log(userEmail)

   const userpassword = await User.findOne({
    password : req.body.password
    
})
console.log(userpassword)

try{
    if(!userEmail || !userpassword){
    res.json("Wrong user or password ")
    }else{
        res.json("Vaild")
    }

}catch{
    res.status(400).json("error")
}


//    if(req.body.name === database.users[0].name &&                  //validation
//     req.body.password === database.users[0].password){
//         res.json('valid')
//     }else{
//         res.status(400).json("error")
//     }

})


app.listen(3001 , () => {

    console.log("app is running on port 3001")
} )