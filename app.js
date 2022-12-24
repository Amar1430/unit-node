// npm run watch
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
app.use(require("body-parser").json())
app.use(express.urlencoded({ extended: true }));
 const local = {user: ""}
mongoose.connect("mongodb+srv://amar:Amarxx@cluster0.u9xyi5h.mongodb.net/?retryWrites=true&w=majority")
  .then( result => {
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  })
  .catch( err => {
    console.log(err);
  }); 
 

app.set('view engine', 'ejs')

app.use(express.static('public'))

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 

const Tshert = require("./models/tshertSchema");
const User = require("./models/user");
 

// app.get 
app.get('/', (req, res) => {
  res.redirect("/home")
})
app.get("/home", (req,res) => {
  
  Tshert.find().then((result) => {
      res.render("index", { mytitle: "Home", tshert: result , user: local.user});
    })
    .catch((err) => {
      console.log(err);
    });
  })

  app.get('/home/cart', (req, res) => {
    res.render('cart', {mytitle: "Cart" , user: local.user})
  })

  app.get('/home/login', (req, res) => {
    res.render('login', {mytitle: "Log In", user: local.user })
  })

  app.get('/home/registrer', (req, res) => {
    res.render('registrer', {mytitle: "Registrer", user: local.user })
  })

  app.get('/home/tshert/:id', (req, res) => {
    Tshert.findById(req.params.id).then((result) => { 
      res.render('tshertpage', {tshert: result , mytitle:result.name })
    }).catch((err) => {
      console.log(err) 
    })
  })



//app.post
app.post("/home", (req,res) => {
  const tshert = new Tshert(req.body);
 
  
  tshert
    .save( )
    .then( result => {
      res.redirect("/home");
    })
    .catch( err => {
      console.log(err);
    });
 
})

app.post("/api/login", async (req,res) => {
    const {username,password} = req.body

   User.findOne({username: username}).then((result) => {


        if (result == null) {
         return   res.json({message: "username not find", success: "not success"}) 
         
    
      } else{
      
        const gg = async () =>  {
         
          if (await bcrypt.compare(password, result.password)) {
            local.user = result.username
            
            res.redirect("/home")
            // res.json({message: "logged in successfully",mylink:"/", username: result.username , success: "success"})
           
        } else {res.json({message: "password not true", success: "not success"})
      }}   
      
      
        gg()}
      
      
      })})
 


app.post("/api/registrer", async (req,res) => {

  const { username, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);


 
    new User({username , password}).save().then((result) => {
      local.user = result.username
    res.redirect("/home")
     }).catch((err) => {
       console.log(err)
  
     })
 
    
  

  
})


//404
app.get('/home/team', (req, res) => {
  res.render('team', {mytitle: "Unit Team" , user: local.user})
})