import moment from 'moment';

const comments = [
  {
    name: `smile`,
    emoji: `./images/emoji/smile.png`,
    author: `John Doe`,
    text: `Interesting setting and a good cast`,
    date: moment(`20100130`).format(`YYYY/MM/DD hh:mm`)
  },
  {
    name: `sleeping`,
    emoji: `./images/emoji/sleeping.png`,
    author: `Tim Macoveev`,
    text: `Booooooooooring`,
    date: moment(`20100214`).format(`YYYY/MM/DD hh:mm`)
  },
  {
    name: `puke`,
    emoji: `./images/emoji/puke.png`,
    author: `Pashka Lomik`,
    text: `Very very old. Meh`,
    date: moment(`20100330`).format(`YYYY/MM/DD hh:mm`)
  },
  {
    name: `angry`,
    emoji: `./images/emoji/angry.png`,
    author: `Tom Cruise`,
    text: `Almost two hours? Seriously?`,
    date: moment(`20100415`).format(`YYYY/MM/DD hh:mm`)
  },
  {
    name: `sleeping`,
    emoji: `./images/emoji/sleeping.png`,
    author: `Tim Macoveev`,
    text: `So-so`,
    date: moment(`20100501`).format(`YYYY/MM/DD hh:mm`)
  },
];

export {comments};
