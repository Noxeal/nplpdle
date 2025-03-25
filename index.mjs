import express from 'express';
import bodyParser from "body-parser";
import request from 'request';
import path from 'path';

const app = express();
let lyrics;
let wordsList;

request('https://api.lyrics.ovh/v1/Flo Rida/Whistle', async function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  lyrics = JSON.parse(body).lyrics;  
  wordsList = lyrics.replaceAll(',', ' ').replaceAll('\n', ' ').replaceAll('\r', ' ').replaceAll(/ +/g, ' ').split(' ');
  wordsList.forEach((element, index) => {
    if(element === '' || element === undefined || element === null){
      wordsList.splice(index, 1);
    }
  });
  console.log(getUnderScoredWords());
  // console.log('Response:', JSON.stringify(body));
});

function getUnderScoredWords(){
  let formattedText = lyrics.replaceAll(/[^, \n\r\t]/g, '_');
  return formattedText;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// app.set('views', path.join(path.dirname(), 'views'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // console.log(wordsList);
  res.render('main.ejs', { paroles:getUnderScoredWords() });
  // res.send(lesLyrics);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
