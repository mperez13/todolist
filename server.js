const express = require('express');
const app = express();
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

// tells  you what database and collections will be used here
const db = mongojs('todolist', ['todolist']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/todolist', function(req, res){
  console.log("I received a GET request.");

  db.todolist.find(function(err, docs){
    console.log(docs); // test to make sure we received the data
    res.json(docs); // sends data back to the controller
  });
});

// have server listen
app.post('/todolist', function(req, res){
  console.log(req.body); // prints the data received
  db.todolist.insert(req.body, function(err, doc){
    res.json(doc);
  });
});

// delete from MongoDB database
app.delete('/todolist/:id', function(req, res){
  let id = req.params.id;
  console.log(id);
  db.todolist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

app.get('/todolist/:id', function(req,res){
  var id = req.params.id;
  console.log(id);
  db.todolist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
      res.json(doc);
  });
});

// get todo by id and modify it
app.put('/todolist/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.todolist.findAndModify({query: {_id: mongojs.ObjectId(id)},
      update: {$set: {title: req.body.title, text: req.body.text, due: req.body.due, status: req.body.status}},
      new: true}, function(err, doc){
        res.json(doc);
    });
});

app.listen(3000);
console.log("Server is running on port 3000");
