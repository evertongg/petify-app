module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        req.flash('error_msg', 'Please log in');
        res.redirect('/');
    }
};
