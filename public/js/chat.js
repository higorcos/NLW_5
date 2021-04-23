document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io(); //criou a conexão

    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none';

    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block';


    const email = document.getElementById('email').value;
    const text = document.getElementById('txt_help').value; 

    

    socket.on('connect',()=>{
        const params = {
            email,
            text,
        }
        socket.emit('client_fist_access', params, (call, err)=>{
            if(err){
                console.log(err);
            }else {
                console.log(call);
            }
        })
    })


});
