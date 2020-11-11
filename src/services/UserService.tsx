import {http} from "../config/http-common";

class UserService {
  getAll() {
    return http.get("/users");
  }
  createUser(data:IRegisterUser){
    return http.post("/api/user",data);
  }
}

export default new UserService();