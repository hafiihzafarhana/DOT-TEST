import { TransformedUserInterface, UserInterface } from "@interfaces/user.interface";
import moment from "moment";

export function userTransformer(user: UserInterface, userRole?: string): TransformedUserInterface {
  const id = user.id;
  const name = user.name;
  const user_name = user.user_name;
  const email = user.email;
  const role = userRole;
  const created_at = moment(user.created_at).format("YYYY-MM-DD HH:mm:ss");
  const updated_at = moment(user.updated_at).format("YYYY-MM-DD HH:mm:ss");

  return {
    id,
    name,
    user_name,
    email,
    role,
    created_at,
    updated_at,
  };
}
