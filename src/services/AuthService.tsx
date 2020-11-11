import {http} from "../config/http-common";

class AuthService {
  
  login(data:IAuthUser){
    return http.post("/api/login",data);
  }

  logout(token:string){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    }
    //null because we are not sendind data.
      return http.post("/api/logout",null,{headers:headers});
  }

}

export default new AuthService();