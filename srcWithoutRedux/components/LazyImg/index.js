import React, { useRef, useEffect } from "react";
// import './index.css';

export default function LazyImg({ imgObj, index, observer }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.children[0]) {
      observer.observe(ref.current);
    }
    return () => {};
  }, [ref]);

  return (
    <div
      ref={ref}
      className="img-box"
      style={{
        aspectRatio: imgObj.width / imgObj.height,
        backgroundColor: `${imgObj.basicColor}`,
      }}
    >
      <img className="img" data-src={imgObj.url} />
      <span className="index">{index + 1}</span>
    </div>
  );
}
