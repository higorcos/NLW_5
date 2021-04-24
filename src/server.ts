import { http } from "./http";
import './websocket/client';
import './websocket/admin';

const port = 3004;
http.listen(port, ()=> console.log(`#########_Server is running on port ${port}_############`));