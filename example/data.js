module.exports = {
  presentation: {
    title: 'Mobile apps with Expo',
    global_styles: `  section h4 {
    display:flex;
    justify-content:space-between;
  }

  code { font-size: large !important; }

  .links, .plain-text { font-size: 1.40rem !important;  }

  .title-slide > p, h1, a {
    font-size: xx-large !important;
    padding: 0.25rem;
  }
`,
  },
  title_slide: {
    lecture_name: 'Mobile app development with the Expo SDK',
    location: {
      presentation_spot: 'American University of Armenia: December 9th, 2017',
      geographic_location: 'Yerevan, Armenia',
    },
    author: {
      name: 'Edgar Aroutiounian',
      twitter: 'https://twitter.com/edgararout',
      github: 'https://github.com/fxfactorial',
    },
    title: 'Making Mobile Applications With Expo',
    byline: 'The fastest way to ship a mobile app',
  },
  content_slides: [
    {
      title: 'First slide title',
      content: [
        'hello world',
        {
          language: 'javascript',
          code: `
console.log('Hello world');
// Bad code!
const f = () => f()
`,
        },
      ],
    },
    {
      title: 'hello 2',
      content: [
        'Some C code, oh yay',
        {
          language: 'c',
          code: `
#include "stdlib.h"

typedef struct{
  int tab[1];
} ts;

int main(void) {
  ts *q = malloc(5*sizeof(int));
  q->tab[2]= 5;
  return 1;
}`,
        },
      ],
    },
    { title: 'hello 3', content: [] },
    { title: 'hello 5', content: [] },
    { title: 'hello world', content: [] },
  ],
};
