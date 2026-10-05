import AVTR1 from "../assets/psmelvinson.webp";
import AVTR2 from "../assets/mahdyf.webp";
import AVTR3 from "../assets/tnoble.webp";
import AVTR4 from "../assets/shorrigan.webp";
import type { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    avatar: AVTR4,
    name: "Samuel Horrigan",
    role: "Peer",
    review:
      "There is no one that has more conviction than Andrew when it comes to data structures, algorithms, and system design.",
  },
  {
    avatar: AVTR2,
    name: "Mahdy Ferdaos",
    role: "Colleague",
    review:
      "Working alongside Andrew has been great. His learning is exponential. He is always eager to learn and improve his skills.",
  },
  {
    avatar: AVTR1,
    name: "Pawel Morysewicz",
    role: "Colleague",
    review: "Andrew is the best teammate I have ever worked with in and out of work.",
  },
  {
    avatar: AVTR3,
    name: "Tyler Noble",
    role: "Peer",
    review: "Andrew is next up in cyber. He is a great team player and has a strong work ethic.",
  },
];
