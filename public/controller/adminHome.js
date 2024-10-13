const  Word  = require('../model/word.js');
const Category = require('../model/category.js');
const { where } = require('sequelize');

exports.getAdminHome = (req, res, next) => {
    const navbarTitle = 'Admin Login';
   const category = Category.findAll();
    res.render('index', {
        navbarTitle,
        title: 'Admin Login',
        path: '/admin',
        category,
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
                navbarTitle: 'Admin Yönetim Hoşgeldiniz!',
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
           
            return res.redirect('/admin/ubungen?error=Kelimesilinemedi');
        }
    } catch (error) {
        console.log(error);
        next(error); 
    }
};

exports.getUpdateWord = async (req, res, next) => {
    const wordId = parseInt(req.params.id);

    try {
        
        const word = await Word.findOne({ where: { id: wordId } });

        if (word) {
            res.render('update', {
                title: 'Güncelleme Sayfası',
                path: '/admin/ubungen/update',
                word,
                isAdmin: true
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

exports.getCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll(); // Modelden tüm kategorileri al
        res.render('category', {
            path: '/admin',
            categories: categories || [], // Veriyi 'categories' olarak gönder
            isAdmin: true 
        });
        console.log(categories);
    } catch (err) {
        console.log(err);
        next(err);
    }
};



exports.postAddCategory = async (req, res, next) => {
    try{ 
        const categoryName = req.body.name;
        const cont = req.body.content;
        const desc = req.body.description;
     await  Category.create({
        name: categoryName ,
        content: cont ,
        description: desc
      })
       .then(result => {
        console.log(result);
       });
       res.redirect('/admin/category');
    
      } catch (err) {
       console.log(err);
      }
        
    }

    exports.postDeleteCategory = async (req, res, next) => {
        const categoryId = req.params.id;
        console.log('Silme isteği alındı, kategori ID:', categoryId);
         try{
          const delCategory = await Category.destroy( { where: { id: categoryId } })

          if(delCategory){
            return res.redirect('/admin/category?action=delete');
          } else {
            return res.redirect('/admin/category?error=kategorisilinemedi')
          }
    }
    catch (err) {
        console.log(err);
    };
 } 

 exports.getUpdateCategory = async (req, res, next) => {
    const categoryId = req.params.id;
    console.log(categoryId);

    try {
        const category = await Category.findOne({ where: { id: categoryId } })
        const categoies = Category.findAll();
        if (category) {

        res.render('categoryupdate', {
            title: 'Kategori Güncelleme Sayfası',
            path: '/admin/category/categoryupdate',
            category,
            categoies ,
            isAdmin: true
        
        })
      } else {
        res.redirect('/admin/category?error=kategori düzenlenemedi')
      }
    } catch (err) {
        console.error(err);
    }
};

exports.postUpdateCategory = async (req, res, next) => {
    const catId = parseInt(req.params.id);
    console.log('Güncellenmeden önce:', catId);
    const catName = req.body.name;
    const catDesc = req.body.description;
    const catCont = req.body.content;

    try {
        // Kategoriyi bul
        const category = await Category.findByPk(catId);
        
        if (!category) {
            return res.redirect('/admin/category?error=KategoriBulunamadı');
        }

        
        category.name = catName;
        category.description = catDesc;
        category.content = catCont;

        
        await category.save();

        console.log('Kategori güncellendi:', category);
        return res.redirect('/admin/category?action=update');
    } catch (err) {
        console.error(err);
        return res.redirect('/admin/category?error=GüncellemeHatası');
    }
};

// for offcanvas data 
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll(); // Veritabanından tüm kategorileri al
        res.json(categories); // JSON formatında döndür
    } catch (error) {
        console.error('Kategori yüklenirken hata oluştu:', error);
        res.status(500).json({ error: 'Veriler yüklenemedi' });
    }
};