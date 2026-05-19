import { Briefcase, Code, MapPin, User } from "lucide-react"
import Stack from "./Stack"
import {motion} from "framer-motion"
import { fadeIn } from "../variants";

const images = [
  
  { id: 1, img: "./stacks/toga.JPG" },
  { id: 2, img: "./stacks/balatik.JPG" },
  { id: 3, img: "./stacks/formal.JPG" }
];

export const AboutMe = () => {
    return <section id="about" className="py-25 px-4 relative scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
            <motion.div
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.3 }}>
                      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                            About Me
                      </h2>

            </motion.div>
          

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
                <motion.div 
                    variants={fadeIn('right', 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.3 }}
                    className="order-2 md:order-1">
                    
                    <div className="bg-white border border-gray-200 rounded-lg drop-shadow-md overflow-hidden max-w-2xl">
                        {/* MacOS window controls - card header */}
                        <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>

                        {/* Content section - card body */}
                        <div className="px-6 py-6 bg-white text-justify">
                            <br />
                            <span className="inline-block">Hi :) </span>
                            <br />
                            <br />
                           👋 I'm Sean, a Software Engineer passionate about building scalable and user-focused applications. 
                          I specialize in developing enterprise web systems, ERP platforms, and full-stack applications using modern technologies such as Next.js, NestJS, Node.js, PostgreSQL, and MongoDB. 👨‍💻
                            <br /><br />
                           I enjoy transforming complex ideas into efficient and reliable software solutions while continuously improving my technical skills through real-world development experience. 
                          I’m currently open to new opportunities where I can contribute, grow, and create meaningful impact through technology 🌏
                        </div>
                    </div>    

                    <motion.div
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-9"
                    >
                        <a
                            href="https://drive.google.com/file/d/1ZcAw1p0ujheTs7ueOzyAdvaPs_-cLakz/view?usp=sharing"
                            className="relative bg-[#f8f9fa] inline-block px-6 py-3 text-sm md:text-base rounded-full border border-[#212529] font-semibold overflow-hidden group"
                        >
                            {/* Text */}
                            <span className="relative z-10 text-primary transition-colors duration-500 group-hover:text-[#f8f9fa]">
                            View Resume
                            </span>

                            {/* Liquid fill effect */}
                            <span className="absolute inset-0 bg-[#212529] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div 
                    variants={fadeIn('left', 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.3 }}
                    className="order-1 md:order-2 grid grid-cols-1 gap-6 md:flex justify-items-center mb-1">

                    <Stack
                        randomRotation={true}
                        sensitivity={120}
                        sendToBackOnClick={true}
                        cardDimensions={{ width: 300, height: 400 }}
                        cardsData={images}/>

                </motion.div>
            </div>
        </div>
    </section>
}
