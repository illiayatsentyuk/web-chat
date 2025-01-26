exports.getMainPage = async (req, res, next) => {
  res.render("main/main-page", {
    pageTitle: "Main page",
  });
};
