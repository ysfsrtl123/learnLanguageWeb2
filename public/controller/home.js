const  Word  = require('../model/word.js'); 
const Category = require('../model/category.js');
const { where } = require('sequelize');

let currentIndex = 0;  

exports.getHome = (req, res, next) => {
    const navbarTitle = 'DEUTSCH';
    const headTitle = 'Learn Deutsch | Startseite';
    res.render('index', { 
        navbarTitle,
        headTitle,
        title: 'HomePage',
        path: '/', 
        isAdmin: false
    });
};

exports.getUberUns = (req, res, next) => {
    const navbarTitle = 'Über Uns';
    const headTitle = 'Learn Deutsch | Über Uns';
    res.render('about', {
        navbarTitle,
        headTitle,
        title: 'ÜberUns',
        path: '/about', 
        isAdmin: false
    });
};

exports.getUbungen = async (req, res, next) => {
    try {
        const navbarTitle = 'Übungen';
        const headTitle = 'Learn Deutsch | Übungen';
        let message = req.query.message || '';  // Query parametrelerinden message alınır

        const words = await Word.findAll({
            order: [['id', 'ASC']]
        });

        if (!words || words.length === 0) {
            message = 'Kelimeler bulunmamaktadır';
            currentIndex = 0;
        }

        if (currentIndex >= words.length) {
            message = 'Tebrikler! Tüm kelimeleri tamamladınız.';
            currentIndex = 0;
        }

        const word = words[currentIndex] || {};

        res.render('ubungen', {
            navbarTitle,
            headTitle,
            word,
            message,  // Message şablona gönderilir
            title: 'Übungen',
            path: '/ubungen',
            isAdmin: false
        });
    } catch (error) {
        next(error);
    }
};




exports.resetTest = (req, res, next) => {
    currentIndex = 0; 

    res.redirect('/ubungen');  
};

exports.postUbungen = async (req, res, next) => {
    let userAnswer = req.body.answer ? req.body.answer.toLowerCase().trim() : '';

    try {
        const words = await Word.findAll({
            order: [['id', 'ASC']]
        });

        if (!words || words.length === 0) {
            return res.redirect('/ubungen?message=Kelimeler bulunmamaktadır');
        }

        if (currentIndex >= words.length) {
            return res.redirect('/ubungen?message=Tüm kelimeleri tamamladınız');
        }

        const word = words[currentIndex];

        if (word && userAnswer === word.answer.toLowerCase()) {
            currentIndex++;

            if (currentIndex >= words.length) {
                currentIndex = 0;
                return res.redirect('/ubungen?message=Tüm kelimeleri tamamladınız');
            }

            return res.redirect('/ubungen');
        } else {
            return res.redirect('/ubungen?error=cevap yanlış');
        }
    } catch (error) {
        next(error);
    }
};

exports.getShowCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        const navbarTitle = 'İçerikler'
        res.render('content', { 
            navbarTitle,
            categories: categories || [],  
            isAdmin: false
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};






