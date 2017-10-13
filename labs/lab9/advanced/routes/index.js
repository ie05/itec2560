var express = require('express');
var router = express.Router();

// not sure why, but the script.js file's AJAX
// requests kept timing out on my machine.
// Rather than writing a keep alive function,
// I simply updated the window.location on the client side.
// This solved the issues of the timeouts not refreshing the view
// but this now falls more in line with a mult-page design rather
// than a single-page design.


/* GET home page. */
router.get('/', function(req, res) {
  req.db.collection('cities').find().toArray(function(err,places){

    if(err){
      return next(err)
    }
    console.log(places);
    // places = JSON.stringify(places)
    return res.render('index', { title: 'Travel Wish List', places : places });

  });
});


/* GET all items home page. */
router.get('/all', function(req, res) {
  req.db.collection('cities').find().toArray(function(err,places){

    if(err){
      return next(err)
    }
    // console.log(places);
    // places = JSON.stringify(places)
    // res.render('index', { title: 'Travel Wish List', places : places });
    return res.json(places);
  });

});


/* POST - add a new location */
router.post('/add', function(req, res) {
  req.db.collection('cities').find().toArray(function (err, allDocs){
     if(err){
          return next(err)
     }
     var counter = allDocs.length;
     counter+=1;
     req.db.collection('cities').find({"name":req.body.name}).toArray(function (err, nameSearch){
        // console.log('nameSearch before insert is ' + nameSearch.length);
         if(err){
          return next(err)
        }
        if(nameSearch.length > 0){

          return false;

        }else{
            var place = {'id': counter.toString() , "name": req.body.name, "visited": false}
            req.db.collection('cities').insertOne(place, function (err){
               if(err){
                  return next(err)
               }
               res.status(201);      // Created
               return res.json(place);      // Send new object data back as JSON, if needed.

          });

        }

      });
    });

});

/* PUT - update whether a place has been visited or not */
router.put('/update', function(req, res){
  var id = { 'id' : req.body.id };
  var been_there = '';
  req.body.visited == "true" ? been_there = true : been_there = false;
  var visited = { $set : { 'visited' : been_there }};

  req.db.collection('cities').findOneAndUpdate(id, visited, function(err) {
    if (err) {
      return next(err);
    }
    req.db.collection('cities').find().toArray(function (err, allDocs){
      return res.json(allDocs);

    });

  });

});


router.delete('/delete', function(req, res){

  req.db.collection('cities').findOneAndDelete({'id' : req.body.id}, function(err, docToDelete) {
      if (err) {
        return next(err);
      }

      res.status(200);
      console.log(docToDelete)  //This contains a value which is the document deleted.
      return res.json(docToDelete.value);  

  });

});

module.exports = router;
