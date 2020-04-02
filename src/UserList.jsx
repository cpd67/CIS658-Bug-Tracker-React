import * as React from 'react';
import { UserRow } from "./UserRow";

export const UserList = props => {
    const { users, onEdit, onDelete } = props;
    return (
        <table className="table table-condensed table-striped">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Thumbnail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, i) => <UserRow key={i} user={user} onEdit={onEdit} onDelete={onDelete} />)}
            </tbody>
        </table>
    );
}