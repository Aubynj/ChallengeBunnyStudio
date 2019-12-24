import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

function UserlistComponent(props) {
    
    return (
        <tr>
            <td>#</td>
            <td ><Link to={'User/'+props.user._id} params={{ testvalue: "hello" }} className='username-link'>{_.capitalize(props.user.username)}</Link></td>
            <td>
                <button className="btn btn-warning"><Link to={'User/edit/'+props.user._id} className="links">Edit</Link></button> |&nbsp;
                <button onClick={() => props.deleteUser(props.user._id)} className="btn btn-danger btn-small">Delete</button>
            </td>
        </tr> 
    )
}
export default UserlistComponent