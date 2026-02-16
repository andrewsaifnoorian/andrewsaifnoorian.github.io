import { useState, useCallback } from "react";
import "./blur-image.css";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const BlurImage = ({ src, alt, className, ...rest }: BlurImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className={`blur-image ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        className={loaded ? "loaded" : ""}
        onLoad={handleLoad}
        {...rest}
      />
    </div>
  );
};

export default BlurImage;
