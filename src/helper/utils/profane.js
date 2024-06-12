import badWords from 'bad-words';

wordsFilter = new badWords();

let customBadWords = [
  'fuckyou',
  'fcuk',
  'fkuc',
  'rape',
  'rapist',
  'kill',
  'harm',
  'violence',
  'threats',
  'bully',
  'damn',
  'hell',
  'crap',
  'idiot',
  'stupid',
  'moron',
  'jerk',
  'fool',
  'xvideos',
  'x-videos',
  'x videos',
  'x_videos',
  'xXvideos',
  'xxx_videos',
  'X_videos',
  'pornhub'
];

wordsFilter.addWords(...customBadWords);
export default wordsFilter;
