
//a concrete service; pass only endpoint to httpService-create called from here

import create from "./httpServices";

export interface User {
    id: number;
    name: string;
    username: string;
  }


//create is from httpServices export
//you pass the end point to that generic httpService

export default create("/users");

