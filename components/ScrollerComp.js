import Marquee from "react-fast-marquee";

const ScrollerComp = ({ children, speed = 50, direction = "left" }) => (
  <Marquee
    speed={speed} 
    direction={direction} // "left" | "right"
    autoFill
    pauseOnHover
  >
    {children}
  </Marquee>
);

export default ScrollerComp;