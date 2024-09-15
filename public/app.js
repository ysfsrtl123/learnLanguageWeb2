const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin'); 
const homeRoutes = require('./routes/user');  

const  sequelize = require('./utility/database');

app.use((req, res, next) => {
    console.log(`Path: ${req.path}`);
    next(); 
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/admin', adminRoutes); // Admin rotalarını '/admin' altına ekler
app.use('/', homeRoutes); // Home rotalarını root olarak ekler

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Seite nicht gefunden' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('500', { pageTitle: 'Etwas ist schief gelaufen!'})
});

 app.use('/public/img/', express.static(process.cwd() + '/public/img'));

sequelize.sync().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
