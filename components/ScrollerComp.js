import Marquee from "react-fast-marquee";

const ScrollerComp = ({ children, speed = 50, direction = "left" }) => (
  <Marquee style={{gap:"60px"}}
    speed={speed} 
    direction={direction} // "left" | "right"
    autoFill
    pauseOnHover
    loop={0}
  >
    {children}
  </Marquee>
);

export default ScrollerComp;