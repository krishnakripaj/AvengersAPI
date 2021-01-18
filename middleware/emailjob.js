function emailjob (req, res, next) {
    console.log("Email Sending Middleware : Executing .... ");
    next();
}

module.exports = emailjob