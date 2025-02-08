import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.services';
import { CreateUserDto, UpdateUserDto } from '../types/user.types';

export class UserController {
    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: CreateUserDto = req.body;
            const user = await UserService.createUser(userData);
            
            res.status(201).json({
                status: 'success',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Getting all users...');  // Add this log
            const users = await UserService.getUsers();
            console.log('Users found:', users);   // Add this log
            
            res.status(200).json({
                status: 'success',
                data: users
            });
        } catch (error) {
            console.error('Error in getUsers:', error);  // Add this log
            next(error);
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            
            res.status(200).json({
                status: 'success',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updateData: UpdateUserDto = req.body;
            const user = await UserService.updateUser(id, updateData);
            
            res.status(200).json({
                status: 'success',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await UserService.deleteUser(id);
            
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}