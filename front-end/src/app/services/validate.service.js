export class ValidateService {

  constructor(){
    this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  friend(friend) {
    if (!friend)
      return { error: 'Preencha os campos corretamente.' };

    else if (friend && !friend.name)
      return { error: 'Nome requerido.'};

    else if (friend && !friend.email)
      return {error: 'Email requerido.'};

    else if (friend && friend.email && !this.emailPattern.test(friend.email))
      return {error: 'Email fora do padrão.'};
  }

}
