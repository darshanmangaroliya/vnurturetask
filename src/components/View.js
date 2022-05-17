import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({contacts,deleteContact}) => {
    
    return contacts.map(contact=>(
        
        <tr key={contact.id}>
            <td>{contact.zipcode}</td>
            <td>{contact.name}</td>
            <td>{contact.contactnumber}</td>
            <td className='delete-btn' onClick={()=>deleteContact(contact.isbn)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}
