import { useRouter } from "next/router";
import { motion } from "framer-motion";

function CountryCard({ country, openModal }: any) {
  const router = useRouter();

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
      onClick={() => openModal(country.cca2)}
    >
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
