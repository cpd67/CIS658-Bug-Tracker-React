import * as React from 'react';
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";

const apiURL = 'http://localhost:3001';

export const UserView = props => {
    let [userList, setUserList] = React.useState([
        { id: 1, fname: "Bobby", lname: "Tables", email: "test@test.com", thumbnail: "test.jpg"}
    ]);
    let [formMode, setFormMode] = React.useState('new');
    let defaultUser = {id: -1, fname: '', lname: '', email: '', thumbnail: ''};
    let [currentUser, setCurrentUser] = React.useState(defaultUser);

    let fetchUsers = () => {
        fetch(`${apiURL}/users`).then(res => {
            return res.json();
        }).then(data => {
            setUserList(data);
        });
    };
    React.useEffect(() => fetchUsers(), []);

    let updateUser = (field, value) => {
        let newUser = { ...currentUser };
        newUser[field] = value;
        setCurrentUser(newUser);
    }
    // Create a new User
    let createUser = user => {
        const opts = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(user)
        };
        return fetch(`${apiURL}/users`, opts).then(res => {
            return res.json();
        });
    };
    // Update a User
    let editUser = user => {
        const opts = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(user)
        };
        return fetch(`${apiURL}/users/${user.id}`, opts).then(res => {
            return res.text();
        });
    }
    // Delete a User
    let deleteUser = user_id => {
        const opts = {
            method: 'DELETE',
        };
        return fetch(`${apiURL}/users/${user_id}`, opts).then(res => {
            return res.text();
        });
    }

    let onSubmit = () => {
        if(formMode === 'new') {
            // Creating a new User
            createUser(currentUser).then(data => {
                if(!data.message) {
                    currentUser.id = data.id;
                    setUserList([...userList, currentUser]);
                } else {
                    console.log("Failed to create User because: " + data.message);
                }
            });
        } else {
            // Updating a User
            editUser(currentUser).then(data => {
                if(!data) {
                    let newUserList = [...userList];
                    let userIndex = userList.findIndex((user) => user.id === currentUser.id);
                    newUserList[userIndex] = currentUser;
                    setUserList(newUserList);    
                } else {
                    console.log("Failed to update User because: " + data);
                }
            });
        }
    }

    let onEdit = (user) => {
        setFormMode('update');
        setCurrentUser(user);
    }
    let onCancel = () => {
        setFormMode('new');
        setCurrentUser(defaultUser);
    }
    let onDelete = (id) => {
        deleteUser(id).then(data => {
            if(!data) {
                setUserList(userList.filter((user) => user.id !== id));
            } else {
                console.log("Failed to delete User because: " + data);
            }
        })
        onCancel();
    }

    return (
        <>
            <UserForm formMode={formMode} user={currentUser} updateUser={updateUser}
                onSubmit={onSubmit} onCancel={onCancel} />
            <UserList users={userList} onEdit={onEdit} onDelete={onDelete} />
        </>
    )
}