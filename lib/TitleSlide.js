import React from 'react';

const TitleSlide = ({
  lectureName,
  byline,
  location: { presentationSpot, geographicLocation },
  author: { name, twitter, github },
}) => (
  <section className="title-slide">
    <h1 style={{ fontSize: 'xx-large' }}>{lectureName}</h1>
    <hr />
    <p>{byline}</p>
    <p style={{ textDecoration: 'underline' }}>{presentationSpot}</p>
    {geographicLocation != null && (
      <p style={{ textDecoration: 'underline' }}>{geographicLocation}</p>
    )}
    <p style={{ fontStyle: 'italic' }}>
      By{' '}
      <a href={twitter || github || ''}>
        {name}
      </a>
    </p>
    <p>
      Progress: <meter min="0" max="100" value="0" />
    </p>
  </section>
);

export default TitleSlide;
