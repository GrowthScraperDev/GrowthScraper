import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import SwiperSlider from "./components/SwiperSlide";
import ScrollerComp from "./components/ScrollerComp";
import Header from "./components/Header";
import CareerForm from "./components/CareerForm";
import ContactForm from "./components/ContactForm";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "eRSUFVMCeEJaDMxy1S6ot3",
      token: "4e4Y1neJu7q7CaeSWdWwEYVUAkFeqQ3ju5l5GZTjdaZUb41mdjmpQMDyHkWd8sFba1R6F4XFY8bVN7yFTLXOQ",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);

PLASMIC.registerComponent(SwiperSlider, {
  name: 'SwiperSlider',
  props: {
    children: 'slot',
    centeredSlides: 'boolean',  
    autoplay: 'boolean',
    mobileSlides: 'number',
    tabletSlides:'number',
    desktopSlides: 'number',
    loop:'boolean',   
    showPagination:'boolean',
    spaceBetween:'number',
    speed:'number'
  },
});

PLASMIC.registerComponent(ScrollerComp, {
  name: 'ScrollerComp',
  props: {
    children: 'slot',
    speed: 'number',
    direction: 'string',
  },
});
PLASMIC.registerComponent(CareerForm, {
  name: 'CareerForm',
  props: {
  },
});
PLASMIC.registerComponent(ContactForm, {
  name: 'ContactForm',
  props: {
  },
});

PLASMIC.registerComponent(Header, {
  name: 'Header',
  props: {
  },
});