import badWords from 'bad-words';

wordsFilter = new badWords();


let customBadWords = ['fuckyou', 'fcuk', 'fkuc'];

wordsFilter.addWords(...customBadWords);
export default wordsFilter;