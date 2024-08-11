const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;

//middleware to parse form data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());


app.use(
  session({
    secret: "4<uOC#LM>eYW1[e",
    resave: false,
    saveUninitialized: true,
  })
);

//view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname)));
app.get('/', (_req, res) => {
    res.render('home');
  });

app.get('/home', (req, res) => {
    res.render('home'); 
});

app.get('/catcare', (_req, res) => {
  res.render('catcare');
});

app.get('/dogcare', (_req, res) => {
  res.render('dogcare');
});
app.get('/privacy', (_req, res) => {
  res.render('privacy');
});
app.get('/contact', (_req, res) => {
  res.render('contact');
});
app.get('/find', (_req, res) => {
  res.render('find');
});


app.get('/pets', (req, res) => {
  fs.readFile(path.join(__dirname, 'availablepets.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading availablepets.txt:', err);
      res.status(500).send('Error reading pets data');
      return;
    }

    try {
      // Split the data by lines
      const entries = data.split('\n');

      // Parse each line and create pet objects
      const pets = entries.map((entry) => {
        const part = entry.split(':');
        const [index, user, breed, age, gender, compatibility, comments, ownerName, ownerSurname, ownerEmail] = part;
        
        const [dogsCompatibility, catsCompatibilityy, childrenCompatibility] = compatibility.split(',').map(item => item.trim());

        return {
          index,
          user,
          breed,
          age,
          gender,
          dogsCompatibility,     
          catsCompatibilityy,
          childrenCompatibility,
          comments,
          ownerName,
          ownerSurname,
          ownerEmail
        };
      });
      res.render('pets', { pets: pets, session: req.session.user });
    } catch (error) {
      console.error('Error parsing pets data:', error);
      res.status(500).send('Error parsing pets data');
    }
  });
});

// Logout Handling
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('logout');
});

app.post('/find', (req, res) => {
  const {catBreed, catAge, catGender, catGetAlong, dogBreed, dogAge, dogGender, dogGetAlong, type } = req.body;

  fs.readFile(path.join(__dirname, 'availablepets.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading availablepets.txt:', err);
      res.status(500).send('Error reading pets data');
      return;
    }

    try {
      const lines = data.trim().split('\n');
      const filteredPets = lines.filter((line) => {
        const [
          index, user, breed, age, gender,
          compatibility, childrenCompatibility, comments, ownerGivenName, ownerSurname, ownerEmail
        ] = line.split(':');
        const [dogsCompatibility, catsCompatibility] = compatibility.split(',').map(item => item.trim());



        let match = true;

        // Check cat criteria
        if (type === 'Cat') {
          if (catBreed && catBreed !== 'Doesnt Matter' && catBreed !== breed) match = false;
          if (catAge && catAge !== 'Doesnt Matter' && catAge !== age) match = false;
          if (catGender && !catGender.includes(gender)) match = false;
          if (catGetAlong) {
            if (catGetAlong.includes('Other Dogs') && !(dogsCompatibility && dogsCompatibility.includes('Other Dogs'))) match = false;
            if (catGetAlong.includes('Other Cats') && !(catsCompatibility && catsCompatibility.includes('Other Cats'))) match = false;
            if (catGetAlong.includes('Children') && !(childrenCompatibility && childrenCompatibility.includes('Yes'))) match = false;
          }
        }
      
        // Check dog criteria
        if (type === 'Dog') {
          if (dogBreed && dogBreed !== 'Doesnt Matter' && dogBreed !== breed) match = false;
          if (dogAge && dogAge !== 'Doesnt Matter' && dogAge !== age) match = false;
          if (dogGender && !dogGender.includes(gender)) match = false;
          if (dogGetAlong) {
            if (dogGetAlong.includes('Other Dogs') &&!(dogsCompatibility && dogsCompatibility.includes('Other Dogs'))) match = false;
            if (dogGetAlong.includes('Other Cats') && !(catsCompatibility && catsCompatibility.includes('Other Cats'))) match = false;
            if (dogGetAlong.includes('Children') && !(childrenCompatibility && childrenCompatibility.includes('Yes'))) match = false;
          }
        }
      
        return match;
      });

      const pets = filteredPets.map((line) => {
       const [ index, user, breed, age, gender, compatibility,childrenCompatibility, comments,
        ownerGivenName, ownerSurname, ownerEmail
    ] = line.split(':');
    const [dogsCompatibility, catsCompatibility] = compatibility.split(',').map(item => item.trim());

    return {
        index, user, breed, age, gender, dogsCompatibility,
        catsCompatibility, childrenCompatibility, comments,
        ownerGivenName, ownerSurname, ownerEmail,
    };      
  });

      res.render('pets', { pets: pets, session: req.session.user });
    } catch (error) {
      console.error('Error parsing pets data:', error);
      res.status(500).send('Error parsing pets data');
    }
  });

  });


// Login logic
 app.get('/login', (req, res) => {
   res.render('login', {
    message: '',
    messageClass: '',
    session: req.session.user,
   });
 });
 
app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  let msg = '';
  let messageClass = '';


  fs.readFile('login.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading login.txt:', err);
      return res.status(500).send('Internal Server Error');
    }

    const userExists = data
      .split('\n')
      .map((line) => line.split(':')[0]);

    if (userExists.includes(user)) {
      userIndex = userExists.indexOf(user);

      const chosenPass = data
        .split('\n')
        .map((line) => line.split(':')[1])[userIndex];

      if (pass === chosenPass) {
        req.session.user = user;
        res.render("give");
      } else {
        res.render('login', {
          message: 'Incorrect password',
          messageClass: 'failure-message',
          session: req.session.user,
        });
      }
    } else {
      msg = `Login failed. User ${user} not found.`;
      messageClass = 'failure-message';
      res.render('login', {
        message: msg,
        messageClass: messageClass,
        session: req.session.user,
      });
    }
  });
 });
//  Give a pet away
 app.get('/give', (req, res) => {
  if (req.session.user) {
    res.render('give', { message: null, messageClass:null, session: req.session.user });
  } else {
    res.redirect('/login');
  }
});

app.post('/give', (req, res) => {
  const {
     type, dogBreed, dogAge, dogGender, dogGetAlong =[], dog_suitable, dogComments,
    catBreed, catAge, catGender, catGetAlong = [], cat_suitable, catComments, ownerGivenName, ownerSurname, ownerEmail
  } = req.body;

    const fp = path.join(__dirname, 'availablepets.txt'); 
    const dogGetsAlongWith = dogGetAlong.join(', ');
    const catGetsAlongWith = catGetAlong.join(', ');
    
    let entries = '';

    if (dogBreed && dogAge && dogGender && dogGetsAlongWith && dogComments) {
      const newDog = `${nextNum()}:${req.session.user}:${dogBreed}:${dogAge}:${dogGender}:${dogGetsAlongWith}:${dog_suitable}:${dogComments}:${ownerGivenName}:${ownerSurname}:${ownerEmail}`;
      entries += newDog + '\n';
    }

    if (catBreed && catAge && catGender && catGetsAlongWith && catComments) {    
      const newCat = `${nextNum()}:${req.session.user}:${catBreed}:${catAge}:${catGender}:${catGetsAlongWith}:${cat_suitable}:${catComments}:${ownerGivenName}:${ownerSurname}:${ownerEmail}`;
      entries += newCat + '\n';
    }

    fs.readFile(fp, 'utf8', (err, data) => {
      if (err && err.code !== 'ENOENT') { //if no file is found
        console.error('Error reading availablepets.txt:', err);
        return res.status(500).send('Internal Server Error');
      }

    fs.appendFile(fp, entries, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.render('give', {
        message: 'Form sumbitted. Your pet has been listed successfully!',
        messageClass: 'success-message',
        session: req.session.user,
      });
    });
  });
});


// Create an account 
app.get('/create', (req, res) => {
  res.render('create', {
    message: null, messageClass:null, session: req.session.user,});
});

app.post('/create', (req, res) => {
  const { user, pass } = req.body;
  let msg = '';
  let messageClass = '';


  fs.readFile('login.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading login.txt:', err);
      return res.status(500).send('Internal Server Error');
    }

    const userExists = data
      .split('\n')
      .map((line) => line.split(':')[0]);

    if (userExists.includes(user)) {
      msg = `Username ${user} already exists. Please choose a different username.`;
      messageClass = 'failure-message';
      res.render('create', {
        message: msg,
        messageClass: messageClass,
        session: req.session.user,
      });
      return;
    }

    const newUser = `${user}:${pass}\n`;
    fs.appendFile('login.txt', newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      msg = 'Account successfully created. You can now log in.';
      messageClass = 'success-message';
      res.render('create', {
        message: msg,
        messageClass: messageClass,
        session: req.session.user,
      });
    });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

function nextNum() {
  try {
    const entries = fs.readFileSync(path.join(__dirname, 'availablepets.txt'), 'utf8');
    const entry = entries.trim().split('\n');
    return entry.length + 1;
  } catch (err) {
    return 1;
  }
}

