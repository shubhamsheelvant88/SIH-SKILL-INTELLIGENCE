function getHome(req, res) {
  res.render("home/index");
}

function redirectToHome(req, res) {
  res.redirect("/home");
}

module.exports = {
  getHome,
  redirectToHome
};
