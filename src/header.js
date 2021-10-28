module.exports = async(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://editor.swagger.io")
    next()
}