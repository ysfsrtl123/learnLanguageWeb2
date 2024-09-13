const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin'); 
const homeRoutes = require('./routes/user');  

const sequelize = require('./utility/database');

sequelize.sync()
.then(result => {
    console.log(result);
})
.catch(err => {
    console.log(err);
});

app.use((req, res, next) => {
    console.log(`Path: ${req.path}`);
    next(); 
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/admin', adminRoutes); 
app.use('/', homeRoutes); 

sequelize.authenticate()
  .then(() => {
    console.log('Veritabanı bağlantısı başarılı.');
  })
  .catch(err => {
    console.error('Veritabanına bağlanılamadı:', err);
  });

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Seite nicht gefunden' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('500', { pageTitle: 'Etwas ist schief gelaufen!'})
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
