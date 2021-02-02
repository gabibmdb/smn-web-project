import { Request, Response} from 'express';
import knex from '../database/connection';

class UsersController {

    async index(req: Request, res: Response) {

        const users = await knex('users')
            .select('users.*')

        return res.json(users);
    }

    async show(req: Request, res: Response) {
        const id = req.params.id;

        const user = await knex('users').where('id', id).first();

        if(!user) {
            return res.status(400).json({ message: 'Register not found' });
        }
    
    }

    async create(req: Request, res: Response) {
        const {
            image,
            name,
            phone,
            cellphone,
            street,
            city,
            uf,
            role,
            email,
            password
        } = req.body

    
        const trx = await knex.transaction();
        
        const user = {
            image,
            name,
            phone,
            cellphone,
            street,
            city,
            uf,
            role,
            email,
            password
        };

        const insertedIds = await trx('users').insert(user);

        const user_id = insertedIds[0];
        
        await trx.commit();

        return res.json({ 
            id: user_id,
            ...user,
         });
    }
};

export default UsersController;