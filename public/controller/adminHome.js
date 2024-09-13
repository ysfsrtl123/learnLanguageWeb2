const { Word } = require('../model/word.js');
const Category = require('../model/category.js');
const Sequelize = require('sequelize')
const sequelize = require('../utility/database');
exports.getAdminHome = (req, res, next) => {
    const navbarTitle = 'Admin Login';
    //const Categories = Category.getAllCategories();
    res.render('index', {
        navbarTitle,
        title: 'Admin Login',
        path: '/admin',
        isAdmin: true
    });
};

exports.getAdminAbout = (req, res, next) => {
    const navbarTitle = 'Admin über uns'; 
    res.render('about', {
        navbarTitle,
        title: 'Admin Login',
        path: '/admin/about', 
        isAdmin: true
    });
};

exports.getAdminUbungen = (req, res, next) => {
    exports.getAdminUbungen = (req, res, next) => {
        const navbarTitle = 'Admin Übungen';
        Word.findAll().then(words => {
            res.render('add', {
                navbarTitle,
                word: words,
                title: 'Admin Übungen',
                path: '/admin/ubungen',
                isAdmin: true
            });
        }).catch(err => {
            console.log(err);
        });
    };
    
    
};

    


exports.postaddword = (req, res, next) => {
    const word = req.body.word;
    const answer = req.body.addAnswer;

    Word.create({
        word: word,
        answer: answer
    })
    .then(result => {
        console.log(result);
        res.redirect('/admin/ubungen');
    })
    .catch(err => {
        console.log(err);
    });
};


exports.postDeleteWord = (req,res,next) => {
    const wordId = parseInt(req.params.id); 

   
};

exports.getUpdateWord = (req, res, next) => {
    const wordId = parseInt(req.params.id);
    const navbarTitle = 'Admin Update';

    
    Word.getWordById(wordId).then(([rows]) => {
        const word = rows[0]; 

    });
};


exports.postUpdateWord = (req, res, next) => {
    console.log(req.body);

    const wordId = req.params.id;
    const updatedWord = {
        word: req.body.updateWord,
        answer: req.body.updateAnswer
    };

   
};

