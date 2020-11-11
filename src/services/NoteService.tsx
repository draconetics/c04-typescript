import {http}  from  '../config/http-common'

class NoteService {

  getList() {
        return http.get("/api/notes");
  }

   createNote(data:Todo){
      return  http.post("/api/notes", data);    
    }
}

const noteService = new NoteService();
export default noteService;
