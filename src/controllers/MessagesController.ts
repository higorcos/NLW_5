import { Request, Response } from "express";
import { MessagesServices } from "../services/MessagesServices";

class MessagesController {
  async create(req: Request, res: Response) {
    const { admin_id, text, user_id } = req.body;

    const messagesServices = new MessagesServices();

    const message = await messagesServices.create({
      admin_id,
      text,
      user_id,
    });
    return res.json(message);
  }
  async showByUser(req: Request, res: Response) {
    const { id } = req.params;

    const messagesService = new MessagesServices();
    const list = await messagesService.listByUser(id);

    return res.json(list);
  }
}

export { MessagesController };
