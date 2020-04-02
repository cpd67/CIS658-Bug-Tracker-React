import * as React from 'react';

export const UserRow = props => {
    const { user, onEdit, onDelete } = props;
    return (
        <tr>
            <td>{user.fname}</td>
            <td>{user.lname}</td>
            <td>{user.email}</td>
            <td>{user.thumbnail ? user.thumbnail : "-"}</td>
            <td>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={e => onEdit(user)}>Edit</button>
                    <button className="btn btn-danger" onClick={e => onDelete(user.id)}>Delete</button>
                </div>
            </td>
        </tr>
    )
}