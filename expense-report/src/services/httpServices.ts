//generic http service class
//for CRUD ops given Entity type and id of single entity for delete or update


import apiClient from "./apiClient";


export interface Entity {
    id: number;
}

//getAll<T> is get all entities, generic Type, because you dont know whether
//it is users, posts, students, queries, customers - could be any entity
//equivalent to getAll<Users>() or getAll<Posts>()....

//

class HttpServices {
    //a property
    endpoint: string; 

    //a constructor() - called when we create instance of this class HttpServices
    //pass endpoint of type string to constructor and set it to endpoint property above

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    //nothing about users or posts in this getAll; its really generic
    getAll<T>() {
        const controller = new AbortController();
        //instead of just returning the promise righaway
        //store in object with both request and cancel object destructures from promise response
        //return apiClient.get<User[]>("/users", {
        const request = apiClient.get<T[]>(this.endpoint, {
          signal: controller.signal,
        });
        
        //return an object, the request as one element
        //and cancel as another element of the object
        //cancel in turn is a call back to cancel get All users if required
        return {request, cancel: () => controller.abort()};

    }

    delete(id: number) {
      return apiClient.delete(this.endpoint + "/" + id);
    }

    create<T>(entity: T) {
      return apiClient.post(this.endpoint, entity);
    }

    update<T extends Entity>(entity: T) {
      return apiClient.patch(this.endpoint + "/" + entity.id, entity);
    }
}

//export new instance of class UserService
const create = (endpoint: string) => new HttpServices(endpoint);
export default create; 








