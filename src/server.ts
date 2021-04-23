import { http } from "./http";
import './websocket/client';

const port = 3000;
http.listen(port, ()=> console.log(`#########_Server is running on port ${port}_############`));