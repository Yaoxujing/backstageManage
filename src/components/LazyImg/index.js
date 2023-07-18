import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
// import Icon from "../icon";
// import styles from "./index.modules.scss";

export default function LazyImg({ src, alt, className }) {
  const imgRef = useRef(null);
  // // 控制是否在加载
  // const [loading, setIsLoading] = useState(true);
  // // 控制是否加载失败
  // const [error, setIsError] = useState();
  useEffect(() => {
    // 监听图片
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 图片在可视区
        imgRef.current.src = imgRef.current.dataset.src;
        // 取消监听
        observer.unobserve(imgRef.current);
      }
    });
    observer.observe(imgRef.current);
  }, []);
  return (
    <div className={classNames(className)}>
      {/* {loading && (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )} */}
      <img
        alt={alt}
        data-src={src}
        // data-src={src}
        ref={imgRef}
        // onLoad={() => { setIsLoading(false); setIsError(false) }}
        // onError={() => { setIsError(true); setIsLoading(true)}}
      ></img>
      )
    </div>
  );
}
