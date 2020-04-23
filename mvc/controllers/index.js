getIndex = function(req, res, next) {
    res.render('index', { title: 'Mongoose' });
}


module.exports = {
    getIndex
};