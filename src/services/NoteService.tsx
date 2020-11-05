import {http}  from  '../config/http-common'

class NoteService {
/*
    http:AxiosInstance;

    constructor(){
        this.http = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                'content-type':'application/json'  // override instance defaults
            },
        });
    }
*/
  async getList() {
        return await http.get("/api/notes");
  }

   async createNote(data:Todo){
      return await http.post("/new", data);    
    }
}
export default new NoteService();
