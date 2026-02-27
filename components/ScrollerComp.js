import Marquee from "react-fast-marquee";

const ScrollerComp = ({children, speed, style}) => (
    <Marquee speed={speed}  style={style} autoFill>
       {children}
    </Marquee>
  );
  
  export default ScrollerComp;