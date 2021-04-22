import { Request, Response } from "express";
import { SettingsServices } from "../services/SettingsServices";

class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;

    const settingsServices = new SettingsServices();

    try {
      // se o usuário for novo
      const settings = await settingsServices.create({ chat, username });

      return res.json(settings);
    } catch (err) {
      //se o usuário já existir
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
export { SettingsController };
