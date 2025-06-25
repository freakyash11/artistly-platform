import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img 
            className="object-cover object-center rounded" 
            alt="hero" 
            src="https://i.pinimg.com/736x/a0/dc/1c/a0dc1c054dcb5f039ffd8b51b31ac5a2.jpg"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Artistly Platform  
          </h1>
          <p className="mb-8 leading-relaxed">
            A place where artists can be booked for events, exhibitions, and more.
          </p>
            <div className="flex justify-center">
            {/* Call to Action Button */}
            <a href="../artists">
              <Button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-700 rounded text-lg shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer">
              Explore Artists
              </Button>
            </a>
            </div>
        </div>
      </div>
    </section>
  );
}