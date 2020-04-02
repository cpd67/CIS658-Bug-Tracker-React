import * as React from 'react';

export const UserForm = props => {
    const { user, updateUser, formMode, onSubmit, onCancel } = props;

    let cancelClicked = (e) => {
        e.preventDefault();
        onCancel();
    }
    let formSubmitted = (e) => {
        e.preventDefault();
        onSubmit();
    }
    let renderButtons = () => {
        if(formMode === 'new') {
            return (
                <button type="submit" className="btn btn-primary">Create</button>
            );
        } else {
            return (
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="submit" className="btn btn-secondary" onClick={cancelClicked}>Cancel</button>
                </div>
            );
        }
    }

    return (
        <div className="form">
            <h1>Users</h1>
            <form onSubmit={formSubmitted}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" autoComplete="given-name" name="fname" id="fname" 
                    placeholder="First Name..." value={user.fname} onChange={(e) => updateUser('fname', e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" autoComplete="last-name" name="lname" id="lname" 
                    placeholder="Last Name..." value={user.lname} onChange={(e) => updateUser('lname', e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" autoComplete="email" name="email" id="email" 
                    placeholder="Email (name@test.com)..." value={user.email} onChange={(e) => updateUser('email', e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Thumbnail</label>
                    <input type="thumbnail" className="form-control" autoComplete="thumbnail" name="thumbnail" id="thumbnail" 
                    placeholder="test.jpg..." value={user.thumbnail} onChange={(e) => updateUser('thumbnail', e.target.value)} />
                </div>
                {renderButtons()}
            </form>
        </div>
    );
}