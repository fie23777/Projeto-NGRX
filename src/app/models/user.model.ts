export class Usuario{

   private uid: string;
   private nome: string;
   private email: string;

   static fronFireBase({uid, nome, email}): any{
    return new Usuario(uid, nome, email)
   }

  constructor(uid: string, nome: string, email: string){
    this.uid = uid;
    this.nome = nome;
    this.email = email;

  }
}
