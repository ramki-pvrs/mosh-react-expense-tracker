//regulat Typescript module
// a function 

import { useEffect, useState } from "react";
import userServices, { User } from "../services/userServices";
import { CanceledError } from "../services/apiClient";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //user may navigate away from fetch and you should be able to Abort fetch
    //modern browsers give AbortController object
    //const controller = new AbortController();

    //axios.get returns a promise
    //if promise is resolved, we get response obj
    //if promise is rejected due to some error, we get error object

    //return controller.abort is part of clean-up/un-subscribe/disconnect kind of functionality
    setLoading(true);
    //axios
    //with userServices separated as module
    //this effect hook has now knowledge of any HTTP request and its implementation details
    //concerns separated
    const { request, cancel } = userServices.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      }) //Leanne Graham
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => cancel();
  }, []);
  //above line firtly was
  //res) => console.log(res.data[0].name)

  return { users, error, isLoading, setUsers, setError};

}

export default useUsers;
