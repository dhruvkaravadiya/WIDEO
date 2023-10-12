import { BiLogoLinkedin } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import myImg from '../../assets/images/dev.jpeg';
export default function Contact() {
  return (
    <>

      <div className="my-auto mx-auto">

        <div className=" mt-14 p-4 w-full  rounded-lg border border-gray-200 shadow-md bg-[#222f46] dark:border-gray-700">
              <div className="flex flex-col items-center p-4">
            <img className="mb-3 w-48 ring-8 h-48 rounded-full shadow-lg" src={myImg} alt="Dev Phot" />
            <h3 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">Dhruv Karavadiya</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">Full Stack Web Developer</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Item 1 */}
              <div className="ml-2 p-4  flex flex-row items-center">
                <MdEmail className="w-12 h-12 rounded-xl p-2  fill-slate-400 bg-[#02142e] mr-4" />
                <div>
                  <h3 className="text-lg text-gray-200 font-semibold">
                    Email Us
                  </h3>
                  
                  <a href="dhruvkaravadiya22@gmail.com" className="text-blue-500">
                    @dhruvkaravadiya
                  </a>
                </div>
              </div>
              {/* Item 1 */}
              <div className="ml-2 p-4  flex flex-row items-center">
                <BiLogoLinkedin className="w-12 h-12 rounded-xl p-2  fill-slate-400 bg-[#02142e] mr-4" />
                <div>
                  <h3 className="text-lg text-gray-200 font-semibold">
                    LinkedIn
                  </h3>
                  <a
                    href="https://linkedin.com/in/dhruvkaravadiya"
                    className="text-blue-500"
                  >
                    /in/dhruvkaravadiya
                  </a>
                </div>
              </div>
              {/* Item 1 */}
              <div className="ml-2 p-4  flex flex-row items-center">
                <RiWhatsappFill className="w-12 h-12 rounded-xl p-2  fill-slate-400 bg-[#02142e] mr-4" />
                <div>
                  <h3 className="text-lg text-gray-200 font-semibold">
                    Whatsapp Us
                  </h3>
                  <p className="text-blue-500">+91-9824275281</p>
                </div>
              </div>
              {/* Item 1 */}
              <div className="ml-2 p-4  flex flex-row items-center">
                <FaGithub className="w-12 h-12 rounded-xl p-2  fill-slate-400 bg-[#02142e] mr-4" />
                <div>
                  <h3 className="text-lg text-gray-200 font-semibold">Github</h3>
                  <a
                    href="https://github.com/dhruvkaravadiya"
                    className="text-blue-500"
                  >
                    /dhruvkaravadiya
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </>
  );
}
