import React from 'react'
import editImage from '../../asstes/images/edit.svg'
import deleteImage from '../../asstes/images/delete.svg'
import { useDispatch } from 'react-redux'
import { editActive } from '../../features/transaction/transactionSlice'

export default function Transaction({ transaction }) {
    const { name, type, amount } = transaction || {}
    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(editActive(transaction))
    }

    return (
        <div><li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button onClick={handleEdit} className="link">
                    <img alt='edit'
                        className="icon"
                        src={editImage}
                    />
                </button>
                <button className="link">
                    <img alt='delete'
                        className="icon"
                        src={deleteImage}
                    />
                </button>
            </div>
        </li></div>
    )
}
