# ez-lectures

Easily make beautiful lectures!

# Usage

```
$ yarn global add @algebr/ez-lectures
$ ez-lectures --src-slides slides.json
```

## Data structures expected for lectures. 

```
type title_slide = {
  author: string,
  title: string,
  byline: ?string, 
}

type slide = {
  title:string,
  content: Array<
    | string 
    | {code: string, programming_language: string}
    | {link: string}
  >,
}

```
