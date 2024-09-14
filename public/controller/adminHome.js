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
        
        const delWord = await Word.destroy({ where: { id: wordId } });

        if (delWord) {
            
            return res.redirect('/admin/ubungen?action=delete');
        } else {
           
            return res.redirect('/admin/ubungen?error=Kelime bulunamadı');
        }
    } catch (error) {
        console.log(error);
        next(error); 
    }
};

exports.getUpdateWord = async (req, res, next) => {
    const wordId = parseInt(req.params.id);;

    try {
        
        const word = await Word.findOne({ where: { id: wordId } });

        if (word) {
            res.render('update', {
                title: 'Güncelleme Sayfası',
                path: '/admin/ubungen/update',
                word
            });
        } else {
           
            res.redirect('/admin/ubungen?error=Kelime bulunamadı');
        }
    } catch (error) {
        console.log(error);
        next(error); 
    }
};


exports.postUpdateWord = async (req, res, next) => {
    const wordId = parseInt(req.params.id); 
    const word = req.body.updateWord; 
    const answer = req.body.updateAnswer;
  
    try {
    Word.findByPk(wordId)
    .then(Word => {
     
        Word.word = word;
        Word.answer = answer;
        return Word.save();

    })
    .then(result => {
        console.log('güncellendi');
        res.redirect('/admin/ubungen?action=update')
    })
    } catch (err) {
        console.log(err);
    }
}


