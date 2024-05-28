export const primaryBGColor = '#4A9D58';
export const secondaryBGColor = '#ffffff';
export const primaryTextColor = '#4A9D58';
export const primaryBGDarkColor = '#2f753b';
export const secondaryTextColor = '#ffffff';
export const primaryDangerColor = '#e74c3c'
export const primaryChatButton = '#ACD793'
export const primaryApplyNowButton = '#577B8D'
export const colors = [
  '#264653',
  '#bc6c25',
  '#f4acb7',
  '#2a9d8f',
  '#e76f51',
  '#fca311',
  '#023e8a',
  '#588157',
  '#48cae4',
  '#ffd6ff',
  '#ae2012',
  '#1b263b',
  '#e0e1dd',
  '#333333',
  '#e63946',
  '#3a86ff',
  '#ffc300',
  '#a8dadc',
  '#ffd60a',
  '#38b000',
];
export const jobsColorSchemes = ['#264653',
'#bc6c25',
'#f4acb7',
'#2a9d8f',
'#e76f51',
'#fca311',
'#023e8a',
'#588157',
'#48cae4',];

export const getRandomColor = (index: number) => {
  return index <= jobsColorSchemes.length
    ? jobsColorSchemes[index]
    : jobsColorSchemes[Math.floor(Math.random() * jobsColorSchemes.length)];
};
export const getRandomBackgroundColor = () =>
  jobsColorSchemes[Math.floor(Math.random() * jobsColorSchemes.length)];
