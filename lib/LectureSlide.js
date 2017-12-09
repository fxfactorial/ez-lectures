import React from 'react';

const LectureSlide = ({ title, content, step }) => {
  const inner = content.map((c) => {
    let currentContent = null;
    if (typeof c === 'string') {
      currentContent = (
        <p className="plain-text" key={`${c.slice(10, 30)}${Math.random()}`}>
          {c.trim()}
        </p>
      );
    } else if (c.code != null) {
      currentContent = (
        <pre key={`${c.code.slice(10, 30)}${Math.random()}`}>
          <code className={`${c.code.language} hljs`}>{c.code.trim()}</code>
        </pre>
      );
    } else if (c.link != null) {
      currentContent = (
        <a
          className="links"
          key={`${c.link.slice(10, 30)}${Math.random()}`}
          href={c.link}
        >
          {c.link}
        </a>
      );
    } else throw new Error('Unknown input', JSON.stringify(c));
    return currentContent;
  });
  return (
    <section>
      <h4>
        {title} <meter min="0" max="100" value={`${step}`} />
      </h4>
      <hr />
      {inner}
    </section>
  );
};

export default LectureSlide;
