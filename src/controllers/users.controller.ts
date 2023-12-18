import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import prisma from '../db/prisma';

export class UserController {
  public static async findAllWithTasks(req: Request, res: Response): Promise<Response> {
    const usersInclude: Prisma.UserInclude = {
      tasks: req.query.includeTasks === 'true' ? true : false,
    };

    const usersWithTasks = await prisma.user.findMany({
      include: usersInclude,
    });

    return res.json(usersWithTasks);
  }

  public static async create(req: Request, res: Response) {
    const createData: Prisma.UserCreateInput = req.body;

    const createdTask = await prisma.user.create({
      data: createData
    });

    return res.json(createdTask);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const filter: Prisma.UserWhereUniqueInput = {
      id: Number(req.params.id),
    };
    const updateData: Prisma.UserUpdateInput = req.body;

    const updatedTask = await prisma.user.update({
      where: filter,
      data: updateData,
    });

    return res.json(updatedTask);
  }

  public static async getById(req: Request, res: Response): Promise<Response> {
    const filter: Prisma.UserWhereUniqueInput = {
      id: Number(req.params.id),
    };
    const user = await prisma.user.findUnique({
      where: filter
    });

    return res.json(user);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const filter: Prisma.UserWhereUniqueInput = {
      id: Number(req.params.id),
    };

    const usersWithTasks = await prisma.user.delete({
      where: filter,
    });

    return res.send();
  }
}