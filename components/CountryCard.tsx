import { useRouter } from "next/router";
import { motion } from "framer-motion";

function CountryCard({ country }: any) {
  const router = useRouter();

  const openCard = (code: string) => {
    router.push(`/${code}`, undefined, { scroll: false });
  };

  if (!country.flags.png) {
    return null;
  }

  return (
    <motion.div
      className="relative h-full border border-gray-400 hover:cursor-pointer rounded-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { duration: 0.3 } }}
      exit={{ scale: 0, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.1 }}
      layout
      onClick={() => openCard(country.cca2)}
    >
      <div className="absolute border-t border-gray-400 bottom-0 w-full h-50% bg-black text-center rounded-b-lg">
        <span className="text-white text-xs font-sans font-bold">
          {country.name.common}
        </span>
      </div>
      <img
        src={country.flags.png}
        alt={country.name.common}
        style={{ maxHeight: 200, maxWidth: "40vw" }}
        className="rounded-lg"
      />
    </motion.div>
  );
}

export default CountryCard;
