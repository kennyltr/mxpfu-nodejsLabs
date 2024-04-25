const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users},null,4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  let getuser = users.filter((user) => user.email === req.params.email);
  res.send(getuser);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({"firstName":req.query.firstName,"lastName":req.query.lastName,"email":req.query.email,"DOB":req.query.DOB});
  res.send('User with first name ' + req.query.firstName + ' has been added.')
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const reqemail = req.params.email;
  let putuser = users.filter((user) => user.email === reqemail);
  const queryfirstname = req.query.firstName;
  const querylastname = req.query.lastName;
  const queryDOB = req.query.DOB;

  if(putuser.length > 0) {
    if(queryfirstname == putuser.firstname && querylastname == putuser.lastname && queryDOB == putuser.DOB) {
      res.send('You did not submit any updates.')
    }
    else {
      putuser = putuser[0]
      if(queryfirstname) {
        putuser.firstname = queryfirstname;
      }
      if(querylastname) {
        putuser.lastname = querylastname;
      }
      if(queryDOB) {
        putuser.DOB = queryDOB;
      }
      users = users.filter((user) => user.email != reqemail);
      res.send(putuser);
      users.push(putuser);
      res.send('User with email ID ' + reqemail + ' was updated.')
    }
  }
  else {
    res.send("Invalid email ID!")
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const reqemail = req.params.email;
  users = users.filter((user) => user.email != reqemail)
  res.send('User with email ID ' + reqemail + ' deleted')
});

module.exports=router;
