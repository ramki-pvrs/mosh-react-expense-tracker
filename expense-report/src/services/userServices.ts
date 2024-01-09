import apiClient from "./apiClient";

export interface User {
    id: number;
    name: string;
    username: string;
  }

class UserServices {
    getAllUsers() {
        const controller = new AbortController();
        //instead of just returning the promise righaway
        //store in object with both request and cancel object destructures from promise response
        //return apiClient.get<User[]>("/users", {
        const request = apiClient.get<User[]>("/users", {
          signal: controller.signal,
        });
        
        //return an object, the request as one element
        //and cancel as another element of the object
        //cancel in turn is a call back to cancel get All users if required
        return {request, cancel: () => controller.abort()};

    }

    deleteUser(id: number) {
      return apiClient.delete("/users/" + id);
    }

    createUser(user: User) {
      return apiClient.post("/users", user);
    }

    updateUser(user: User) {
      return apiClient.patch("/users/" + user.id, user);
    }
}

//export new instance of class UserService
export default new UserServices();


