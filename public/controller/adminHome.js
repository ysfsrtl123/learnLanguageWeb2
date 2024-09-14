const  Word  = require('../model/word.js');
const Category = require('../model/category.js');

exports.getAdminHome = (req, res, next) => {
    const navbarTitle = 'Admin Login';
   // const Categories = Category.getAllCategories();
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
    Word.findAll()
        .then(words => {
            res.render('add', {
                navbarTitle: 'Admin Übungen',
                word: words, 
                title: 'Admin Übungen',
                path: '/admin/ubungen',
                isAdmin: true
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postaddword = async (req, res, next) => {
    const word = req.body.word;
    const answer = req.body.addAnswer;
   await Word.create({
        word: word,
        answer: answer
    }).then(result => {
        console.log(result);
        res.redirect('/admin/ubungen');
    }).catch(err => {
        console.log(err);
    });
};

exports.postDeleteWord = async (req, res, next) => {
    const wordId = req.params.id; 
      console.log('wordId', wordId);
    try {
        
        const result = await Word.destroy({ where: { id: wordId } });

        if (result) {
            
            return res.redirect('/admin/ubungen?success=Kelime başarıyla silindi');
        } else {
           
            return res.redirect('/admin/ubungen?error=Kelime bulunamadı');
        }
    } catch (error) {
        console.log(error);
        next(error); 
    }
};


exports.getUpdateWord = (req, res, next) => {
    const wordId = parseInt(req.params.id);
    const navbarTitle = 'Admin Update';

        res.render('update', { title: 'Kelime Güncelle', navbarTitle, word: word });
};


exports.postUpdateWord = (req, res, next) => {
    console.log(req.body);

    const wordId = req.params.id;
    const updatedWord = {
        word: req.body.updateWord,
        answer: req.body.updateAnswer
    };

};

