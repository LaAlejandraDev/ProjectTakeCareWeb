import PearsonList from "../components/Chat/PearsonList";
import { Contacts } from "../data/Contacts";

export default function Messages() {
  return (
    <>
      {Contacts.length > 0 ? (
        <PearsonList contactList={Contacts} />
      ) : (
        <p className="text-center mt-10 text-gray-500">
          No tienes mensajes aún
        </p>
      )}
    </>
  );
}
