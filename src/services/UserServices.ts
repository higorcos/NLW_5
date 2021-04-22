import { getCustomRepository, Repository } from "typeorm";
import { User } from '../entities/User'
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
    
    private usersRepository: Repository<User>
    constructor(){
      this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string){
        
    //verifica se o usuário existe 
    const userExists = await this.usersRepository.findOne({
        email,
    })
    //se existir, retorna user
    if(userExists){
        return userExists;
    }

    const user = this.usersRepository.create({
        email,
    })
    //se não existir, salva no DB
    await this.usersRepository.save(user);

    return user 
    }  
} 
export {UsersService}
 