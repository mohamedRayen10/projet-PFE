import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-red-700 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl text-gray-100 my-2">Vous souhaitez en savoir plus sur le CCCT</h2>
        <p className="text-gray-100 my-2">
        Consultez ces ressources</p>
        <a
  href="https://www.facebook.com/cccantun/?locale=fr_FR"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button gradientDuoTone="purpleToBlue" outline className="text-xl px-1 py-3 w-full rounded-bl-none">
  Consultez
  </Button>
</a>

      </div>
      <div className="p-5 flex-1">
      <img
          src="/images/im2.jpg"
          alt="CCCT Banner"
          
        />
      </div>
    </div>
  );
};

export default CallToAction;
