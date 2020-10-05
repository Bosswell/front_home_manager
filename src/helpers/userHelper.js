import { v4 as uuidv4 } from "uuid";

export const getUserId = () => {
    let id = localStorage.getItem('exam-user-id');

    if (id) {
        return id;
    }

    id = uuidv4();
    localStorage.setItem('exam-user-id', id);

    return id;
}