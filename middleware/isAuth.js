const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1]
    
};

module.exports = isAuth;
