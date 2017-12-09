import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs-extra';
import untildify from 'untildify';
import { resolve } from 'path';
import makeLecture from './html-template';
import LectureSlide from './LectureSlide';
import TitleSlide from './TitleSlide';
import { errorOut } from './utils';

const buildLectures = async (
  dest,
  lecturesSourceData,
  codeTheme,
  slideTheme,
) => {
  // console.log({ dest, lecturesSourceData, codeTheme, slideTheme });
  let presentationData = null;
  try {
    presentationData = require(resolve(lecturesSourceData[0] === '~'
      ? untildify(lecturesSourceData)
      : lecturesSourceData));
    // console.log(presentationData.content_slides[1].content[1].code);
  } catch ({ message }) {
    errorOut(`Could require lectures: ${message}`);
  }
  const totalSlideCount = presentationData.content_slides.length;
  const starter = Math.floor((1 / totalSlideCount) * 100);
  const result = [];
  result.push(<TitleSlide {...presentationData.title_slide} key={`${Math.random()}`} />);
  presentationData.content_slides.forEach((lectureSlide, idx) => {
    result.push(<LectureSlide
      key={`${Math.random()}`}
      step={((idx / totalSlideCount) * 100) + starter}
      {...lectureSlide}
    />);
  });
  const slideElements = slides => <div className="slides">{slides}</div>;
  await fs.writeFile(
    dest,
    makeLecture(
      presentationData.presentation.title,
      ReactDOMServer.renderToStaticMarkup(slideElements(result)),
      slideTheme || 'sky',
      codeTheme || 'ocean',
      presentationData.presentation.global_styles,
    ),
  );
};

export default buildLectures;
