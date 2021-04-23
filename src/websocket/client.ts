import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsServices";
import { UsersService } from "../services/UserServices";
import { MessagesServices } from "../services/MessagesServices";

interface IParams{
    text: string;
    email: string;
}

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesServices = new MessagesServices();

  socket.on("client_fist_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;

    //verifica o usuário
    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      // se não existir
      const user = await usersService.create(email); //vai criar usuário

      await connectionsService.create({
        //salva
        socket_id,
        user_id: user.id,
      });
      user_id = user.id;
    } else {
      // se já existir

      user_id = userExists.id;
      const connection = await connectionsService.findByUserId(userExists.id);

      if (!connection) {
        await connectionsService.create({
          //salva
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection); // vai sobrescrever com como id
      }
    }
    console.log(params)
    await messagesServices.create({
      // vai salvar a message
      text,
      user_id,
    });
  });
});
