import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

const userSalute = () => {
  let hello = format(new Date(), "HH", { locale: ptBR });
  
  let salute = Number(hello) < 12 
  ? "Bom dia!" 
  : Number(hello) < 18 
  ? "Boa tarde!" 
  : "Boa noite!";

  return salute;
};

export default userSalute;




