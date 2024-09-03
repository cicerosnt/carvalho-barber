import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  
  const authorizedEmails = [
    "cdsantos.snt@gmail.com",
    "pedromendesv96@gmail.com",
    "leodecarvalh@gmail.com"
  ];
  
  if (!authorizedEmails.includes(String(session?.user?.email))) {
    return false
  }
  
  return true
};

export default isAdmin;




