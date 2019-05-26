module.exports ={
  addArtist:function(req, res){
    data.push({
      name: req.body.title
    });
    res.render('objects.ejs', {
      data: data
    });
  }
}
