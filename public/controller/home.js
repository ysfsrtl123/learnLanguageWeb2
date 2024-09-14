const  Word  = require('../model/word.js'); 
const Categories = require('../model/category.js');
const { where } = require('sequelize');

let currentIndex = 0;  // Başlangıç index değeri

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

      
      const word = await Word.findOne({ where: { id: currentIndex + 1 } });
  
      const message = word ? '' : 'Kelime Bulunmamaktadır';
       const error = req.query.error || '';
       
      res.render('ubungen', {
        navbarTitle,
        headTitle,
        word,  
        message,
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
        const word = await Word.findOne({where: currentIndex+1});

        if(userAnswer === word.answer.toLowerCase()) {
            currentIndex++;
            return res.redirect('/ubungen');

        } else {
            return res.redirect('/ubungen?error=cevap yanlış');
        }
    } catch (error) {
        next(error);
    }
    
   
    currentIndex++;
  
   
    const totalWords = await Word.count();  
    if (currentIndex >= totalWords) {
        currentIndex = 0;  
    }

    res.redirect('/ubungen');
};
