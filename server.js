var express = require("express");
var app = express();
var path = require("path");
var fs = require('fs');
var filepath = 'testFile.txt';
const testFolder = './';


var HTTP_PORT = process.env.PORT || 8080;

let test = "Test file Test file Test file Test file Test file Test file Test file Test file Test file Test file Test file Test file";

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));
// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req,res) => {
   res.sendFile(path.join(__dirname + "/views/home.html"));
   console.log("!!!!!!")
   fs.writeFile(filepath, test, (err) => {
    if (err) throw err;
    // success case, the file was saved
    console.log( filepath + ' create successfully!!');
  });
});

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

app.get("/delete", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/delete.html"));
   fs.unlink(filepath, (err)=> {
    if (err) throw err;
    // success case, the file was delete
    console.log(filepath+' delete successfully!');
   })
});

fs.writeFile(filepath, test, (err) => {
  if (err) throw err;
  // success case, the file was saved
  console.log(filepath + ' create successfully!!');
});


// setup http server to listen on HTTP_PORT

app.use(function(req, res) {
  res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
});

app.listen(HTTP_PORT, onHttpStart);

app.use(express.static('public'));