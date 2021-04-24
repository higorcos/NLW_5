import { io } from '../http';
import { ConnectionsService } from "../services/ConnectionsServices"
import { MessagesServices } from "../services/MessagesServices"

io.on('connect', async (socket) => {
    const connectionsService = new ConnectionsService();
    const messagesServices = new MessagesServices();


    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
    
    // listar menagens para o adm
    socket.on('admin_list_messages_by_user', async (params, callback) =>{
        const {user_id}= params;

        const allMessages = await messagesServices.listByUser(user_id);

        callback(allMessages) //vai retornar para quem fez a solicitação 
    });

    socket.on('admin_send_message', async (params) => {
        const { user_id, text} = params;

        await messagesServices.create({
            text,
            user_id,
            admin_id: socket.id,
        });
        
        const { socket_id } = await connectionsService.findByUserId(user_id);

        io.to(socket_id).emit('admin_send_to_client',{
            text,
            socket_id: socket.id,
        })
    });
/*     socket.on('admin_user_in_support', async params =>{
        const { user_id } = params;
        const connection = await connectionsService.updateAdminId(user_id, socket.id);

    }) */
});

