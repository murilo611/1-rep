var express = require('express')
var http = require('http')
let ejs = require('ejs')
var app = express();

app.set('view engine', 'ejs');

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
    res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
    next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});
app.use(express.static(__dirname + '/public'));

app.get('/sitemap.xml', async function(req, res, next){
    let xml_content = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      '  <url>',
      '    <loc>http://www.example.com/</loc>',
      '    <lastmod>2005-01-01</lastmod>',
      '  </url>',
      '</urlset>'
    ]
    res.set('Content-Type', 'text/xml')
    res.send(xml_content.join('\n'))
  })

app.get('/', function(req, res) {
   
    res.render('pages/index', {
        
    });
});







var port = process.env.PORT || 3000
app.listen(port,function() {
    console.log('rodando na ' + port)
})