var express = require("express");
var app = express();
var path = require("path");
var fs = require('fs');
var filepath = './testFile.txt';
const testFolder = './';
const chalk = require('chalk');
var countFiles = require('count-files')
// const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');


var HTTP_PORT = process.env.PORT || 3000;

let test = "Test file Test file Test file Test file Test file Test file Test file Test file Test file Test file Test file Test file";

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.engine(".hbs", exphbs({
//     extname: ".hbs",
//     defaultLayout: 'layout',
//     helpers: {
//         equal: (lvalue, rvalue, options) => {
//             if (arguments.length < 3)
//                 throw new Error("Handlebars Helper equal needs 2 parameters");
//             if (lvalue != rvalue) {
//                 return options.inverse(this);
//             } else {
//                 return options.fn(this);
//             }
//         }
//     }
// }));
// app.set("view engine", ".hbs");

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req,res) => {
   res.sendFile(path.join(__dirname + "/views/home.html"));
  //  res.send("hahahah");
   fs.writeFile(filepath, test, (err) => {
    if (err) throw err;
    // success case, the file was saved
    console.log( filepath + ' create successfully!!');
  });
  console.log(chalk.red("==================="))
  var stats = countFiles(testFolder, function (err, results) {
    console.log(chalk.yellow('done counting'));
    console.log(results);// { files: 10, dirs: 2, bytes: 234 }
    console.log(chalk.red("==========================================="))

  });
  setTimeout(function() {
    fs.readdir(testFolder, (err, files) => {
      console.log(chalk.red("==================="))
      console.log(chalk.red("Here the file list"));
      files.forEach(file => {
        console.log(chalk.blue(file));
      });
      console.log(chalk.red("==================="))
    })
  }, 50);

});

app.get("/delete", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/delete.html"));
   fs.unlink(filepath, (err)=> {
    if (err) throw err;
    // success case, the file was delete
    console.log(filepath+' delete successfully!');
   })
   console.log(chalk.red("==================="))
  var stats = countFiles(testFolder, function (err, results) {
    console.log(chalk.yellow('done counting'));
    console.log(results);// { files: 10, dirs: 2, bytes: 234 }
    console.log(chalk.red("==========================================="))
  });
   setTimeout(function() {
    fs.readdir(testFolder, (err, files) => {
      console.log(chalk.red("==================="));
      console.log(chalk.red("Here the file list after delete textFile.txt:"));
      files.forEach(file => {
        console.log(chalk.blue(file));
      });
      console.log(chalk.red("==================="));
    })
  }, 50);
});

app.get("/deleteSync", (req, res) => {
  fs.unlinkSync(filepath);
  res.sendFile(path.join(__dirname + "/views/delete.html"));
  
   setTimeout(function() {
    fs.readdir(testFolder, (err, files) => {
      console.log(chalk.red("==================="));
      console.log(chalk.red("Here the file list after delete textFile.txt:"));
      files.forEach(file => {
        console.log(chalk.blue(file));
      });
      console.log(chalk.red("==================="));
    })
  }, 50);
  console.log(chalk.red("==================="))
  var stats = countFiles(testFolder, function (err, results) {
    console.log(chalk.yellow('done counting'));
    console.log(results);// { files: 10, dirs: 2, bytes: 234 }
    console.log(chalk.red("==========================================="))
  });
});

fs.readdir(testFolder, (err, files) => {
  console.log(chalk.red("==================="))
  console.log(chalk.red("Here the file list:"))
  files.forEach(file => {
    console.log(chalk.blue(file));
  });
  console.log(chalk.red("==================="))
  var stats = countFiles(testFolder, function (err, results) {
    console.log(chalk.yellow('done counting'));
    console.log(results);// { files: 10, dirs: 2, bytes: 234 }
    console.log(chalk.red("==========================================="));
  });
})

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

// app.use(express.static('public'));