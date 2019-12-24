import React, { useEffect } from 'react'
import UserlistComponent from './UserlistComponent'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUsers, deleteUser } from '../../Redux/Action/action'

function UserList(props) {
    const {fetchUsers, deleteUser} = props

    useEffect(() =>{
        fetchUsers()
    }, [fetchUsers])  

    return (
        <div className="container push-down">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th width="70%">Users</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   props.users_all.length > 0 ?
                                props.users_all.map(userlist =>{
                                    return <UserlistComponent user={userlist} deleteUser={deleteUser} key={userlist._id}/>
                                }) : null
                                    
                            }
                        </tbody>
                    </table>
                    {
                        props.users_all.length < 1 ? <h3 className='no-user-text'>No User added yet</h3> : null
                    }
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users_all : state.users.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers : () => dispatch(fetchUsers()),
        deleteUser : (id) => dispatch(deleteUser(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList))