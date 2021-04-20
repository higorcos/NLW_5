import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import {v4 as uuid } from "uuid" //biblioteca de criação de id 

@Entity('settings') //nome da tabela 
class Setting {
    @PrimaryColumn()
    id: string;
    
    @Column()
    username: string;
    
    @Column()
    chat: boolean;
    
    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) { //se não tiver id vai gerar um com o uuid
            this.id = uuid();
        }
    }
}
export { Setting }