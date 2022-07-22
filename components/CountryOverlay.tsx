import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import NumberFormat from "react-number-format";

export default function CountryOverlay({ country, onClose }: any) {
  const titleRef = useRef(null);

  return (
    <>
      <Transition appear show as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={onClose}
          initialFocus={titleRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-gray-900 p-4 text-left align-middle shadow-xl transition-all">
                  <div className="absolute top-2 right-2 text-2xl text-white">
                    <button onClick={onClose}>
                      <IoClose />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-medium text-white"
                    ref={titleRef}
                  >
                    {country.name.common}
                  </Dialog.Title>
                  {country.name.common !== country.name.official && (
                    <h4 className="text-lg text-gray-100">
                      ({country.name.official})
                    </h4>
                  )}
                  <div className="mt-2 text-white">
                    <p>Capital: {country.capital}</p>
                    <NumberFormat
                      value={country.population}
                      displayType={"text"}
                      thousandSeparator
                      prefix="Population: "
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
