/** Edgar Aroutiounian, twitter.com/@edgararout */

import React from 'react';
import fs from 'fs-extra';
import ReactDOMServer from 'react-dom/server';
import minimist from 'minimist';
import chalk from 'chalk';
import untildify from 'untildify';
import { resolve } from 'path';

import make_lecture from './html-template';

const argv = minimist(process.argv.slice(2));

const LectureSlide = ({ title, content, step }) => {
  const inner = content.map(c => {
    let content = null;
    if (typeof c === 'string') {
      content = (
        <p className={'plain-text'} key={`${c.slice(10, 30)}${Math.random()}`}>
          {c.trim()}
        </p>
      );
    } else if (c.code !== undefined) {
      content = (
        <pre key={`${c.code.slice(10, 30)}${Math.random()}`}>
          <code className={`${c.code.language} hljs`}>{c.code.trim()}</code>
        </pre>
      );
    } else if (c.link !== undefined) {
      content = (
        <a className={'links'} key={`${c.link.slice(10, 30)}${Math.random()}`} href={c.link}>
          {c.link}
        </a>
      );
    } else throw new Error('Unknown input', JSON.stringify(c));
    return content;
  });
  return (
    <section>
      <h4>
        {title} <meter min={'0'} max={'100'} value={`${step}`} />
      </h4>
      <hr />
      {inner}
    </section>
  );
};

const TitleSlide = ({
  lecture_name,
  byline,
  location: { presentation_spot, geographic_location },
  author: { name, twitter, github },
}) => (
  <section className={'title-slide'}>
    <h1 style={{ fontSize: 'xx-large' }}>{lecture_name}</h1>
    <hr />
    <p>{byline}</p>
    <p style={{ textDecoration: 'underline' }}>{presentation_spot}</p>
    {geographic_location !== void 0 && (
      <p style={{ textDecoration: 'underline' }}>{geographic_location}</p>
    )}
    <p style={{ fontStyle: 'italic' }}>
      By <a href={twitter !== void 0 ? twitter : github !== void 0 ? github : ''}>{name}</a>
    </p>
    <p>
      Progress: <meter min={'0'} max={'100'} value={'0'} />
    </p>
  </section>
);

function error_out(message) {
  console.error(chalk.red(message));
  process.exit(-1);
}

const build_lectures = async (dest, lectures) => {
  let presentation_data = null;
  try {
    presentation_data = require(resolve(lectures[0] === '~' ? untildify(lectures) : lectures));
  } catch ({ message }) {
    error_out(`Could require lectures: ${message}`);
  }
  const total_slide_count = presentation_data.content_slides.length;
  const starter = Math.floor(1 / total_slide_count * 100);

  const result = [];
  result.push(<TitleSlide {...presentation_data.title_slide} key={`${Math.random()}`} />);
  presentation_data.content_slides.forEach((lecture_slide, idx) => {
    result.push(
      <LectureSlide
        key={`${Math.random()}`}
        step={idx / total_slide_count * 100 + starter}
        {...lecture_slide}
      />
    );
  });
  const slide_elements = slides => <div className={'slides'}>{slides}</div>;
  await fs.writeFile(
    dest,
    make_lecture(
      presentation_data.presentation.title,
      ReactDOMServer.renderToStaticMarkup(slide_elements(result)),
      presentation_data.presentation.global_styles
    )
  );
};

const HELP_PROMPT = `Arguments:

--src-slides Provide the source slides JSON data, see README of project for structure expected
--dest Provide the destination path, otherwise will dump result in current directory as index.html
--watch Watch the input data so that ez-lectures just rebuilds automatically, great for development
`;

module.exports.run = async () => {
  const { help, dest, watch } = argv;
  if (help) {
    console.log(chalk.cyan(HELP_PROMPT));
    process.exit(0);
  }
  if (argv['src-slides'] === void 0) {
    error_out('Must provide source slides file path');
  }
  try {
    if (watch === undefined) {
      await build_lectures(dest === void 0 ? 'index.html' : dest, argv['src-slides']);
    } else {
      fs.watch(argv['src-slides'], async evType => {
        if (evType === 'change') {
          console.log(chalk.cyan('Rebuilding'));
          await build_lectures(dest === void 0 ? 'index.html' : dest, argv['src-slides']);
        }
      });
    }
  } catch ({ message }) {
    error_out(`Could not build lecture notes, reason: ${message}`);
  }
};
