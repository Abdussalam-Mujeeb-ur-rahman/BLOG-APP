function getHomePage(req, res){
    const articles = [ 
        {
            title: 'thefirstarticle',
            decription: 'the crazy one',
            author: 'Abdussalam',
            createdAt: new Date()
        },
         {
            title: 'the2article',
            decription: 'the mad psychologist',
            author: 'sodiq',
            createdAt: new Date()
        },
        {
            title: 'the3article',
            decription: 'the sensed future',
            author: 'soothsayer mikel',
            createdAt: new Date()
        }
    ]
    try {
        res.render('articles/index', { articles: articles})
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = {
    getHomePage
}