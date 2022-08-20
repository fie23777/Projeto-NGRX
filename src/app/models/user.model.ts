export class Usuario{


   static fronFireBase({uid, nome, email}): any{
    return new Usuario(uid, nome, email)
   }

  constructor(public uid: string, public nome: string, public email: string){


  }
}
