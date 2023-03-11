// npm run watch
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
app.use(require("body-parser").json())
app.use(express.urlencoded({ extended: true }));
 const local = {user: "", }


 mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://amar:Amarxx@cluster0.u9xyi5h.mongodb.net/?retryWrites=true&w=majority")
  .then( result => {
app.listen(port, process.env.port || 3000 , () => {
  console.log(`Example app listening on port ${port}`)
})

  })
  .catch( err => {
    console.log(err);
  }); 
 

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(cookieParser())
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


const Tshert = require("./models/tshertSchema")
const User = require("./models/user")
const doneCart = require("./models/DoneCart")
const incart = require("./models/inCart")
const { request } = require('express');


// app.get 
app.get('/', (req, res) => {
  res.redirect("/home")
})

app.get('/home/profile', (req, res) => {
  res.render("profile", { mytitle: "Profile" , user: req.cookies.name});
})
app.get("/home", (req,res) => {
  
  Tshert.find().then((result) => {
      res
      .render("index", { mytitle: "Home", tshert: result , user: req.cookies.name})
    })
    .catch((err) => {
      console.log(err);
    });
  })

  app.get('/home/cart', (req, res) => {
    incart.find({user: req.cookies.name}).then((inCart) => {
 
        res.render('cart', {mytitle: "Cart" , user: req.cookies.name, tshert: inCart,   })
    
    }).catch((err) => {
      console.log(err)
      
    })
  })

  app.get('/home/login', (req, res) => {
    res.render('login', {mytitle: "Log In", user: req.cookies.name })
  })
  app.get('/home/admin/dashboard', (req, res) => {
    User.findOne({username: req.cookies.name}).then((result) => {
     if (result.admin == "yes") {

       doneCart.find().then((result) => {
       
        res.render('Dashboard', {mytitle: "DashBoard", user: req.cookies.name, req: result })
        
      })

     } else {
      res.redirect("/home")
     }
      
    })
  })
  app.get('/home/registrer', (req, res) => {
    res.render('registrer', {mytitle: "Registrer", user: req.cookies.name })
  })

  app.get('/home/tshert/:id', (req, res) => {
    Tshert.findById(req.params.id).then((result) => { 
      res.render('tshertpage', {tshert: result, user: req.cookies.name , mytitle:result.name })
    }).catch((err) => {
      console.log(err) 
    })
  })

  app.get('/home/admin/finishReq/:id', (req, res) => {
    doneCart.findById(req.params.id).then((result) => { 
     
        User.findOne({username: req.cookies.name}).then((resultUser) => {
       const l = []
       
  result.name.forEach(element => {
    
    Tshert.findOne({name: element}).then((resultT) => {
 l.push(resultT)
    
  }).catch((err) => {
    console.log(err) 
  })
});
setTimeout(() => {
 
  res.render('reqFinish', {req: result,phone:resultUser.phone, tshert: l , user: req.cookies.name , mytitle: resultUser.username })
}, 300);






    })
  }).catch((err) => {
    console.log(err) 
  })
})
app.get('/home/team', (req, res) => {
  res.render('team', {mytitle: "Unit Team" , user: req.cookies.name})
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
          //  local.user = result.username
            res.cookie("name" , result.username).json({message: "login", success: "success"})
           
            
        } else {res.json({message: "password not true", success: "not success"})
      }}   
      
      
        gg()}
      
      
      })})
 


app.post("/api/registrer", async (req,res) => {

  const { username, password: plainTextPassword, phone, admin } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);


User.findOne({username}).then((result) => {

  if(result == null){
    new User({username , password, phone, admin}).save().then((result) => {
  
    
      res.cookie("name" , result.username).json({message: "done", success: "success"})
    }).catch((err) => {
      console.log(err)
      
    })
  }else{
    
    res.json({message: "Userneam in Use", success: "not success"})
  }
  })
 
    
  

  
    })

    app.post("/api/addToCart", (req,res) => {

      new incart(req.body).save().then((result) => {

      }).catch((err) => {
        console.log(err)
        
      })
      console.log(req.body)
      
    })
    app.post("/api/DoneShop", (req,res) => {
     
      new doneCart(req.body).save().then((result) => {
    
      
    
          
     result.name.forEach(element => {
       
       incart.findOneAndDelete({name: element}).then((resultT) => {
   res.json("done")
     }).catch((err) => {
       console.log(err) 
     })
   });

   
 
      }).catch((err) => {
        console.log(err)
        
      })
   
    })

    app.post("/api/editUser", (req,res) => {

      User.findOneAndUpdate({username: req.cookies.name}, {username: req.body.editUsername}, (err, result) => {
        res.cookie("name", req.body.editUsername ).json("done")
        req.cookies.name = req.body.editUsername

      })
       


        
      })
      app.post("/api/logout", (req,res) => {

        res.cookie("name", "").json("done")

        })
    // delet
    app.delete("/api/CartDel", (req,res) => {

    

      incart.findByIdAndDelete(req.body.id).then((result) => {
    
      
      })
        
      })
        
      app.delete("/api/done", (req,res) => {

        doneCart.findByIdAndDelete(req.body.id).then((result) => {
          res.json({data:"done"})
          })

          
        })
          
        app.delete("/api/delete-Account", (req,res) => {

          User.findOneAndDelete({username: req.cookies.name}).then((result) => {
            res.cookie("name", "").json("done")
           
            })
  
            
          })
            
  


//404
app.use( (req, res) => {
  
  res.render('404', {mytitle: "404" , user: req.cookies.name})
}) 