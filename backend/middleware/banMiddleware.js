const notBanned = (req, res, next) => {
    if (req.user && req.user.isBanned) {
        res.status(403);
        throw new Error('Your account has been banned. Please contact admin.');
    }
    next();
};

export { notBanned };
