import React from 'react'
import editImage from '../../asstes/images/edit.svg'
import deleteImage from '../../asstes/images/delete.svg'
import { useDispatch } from 'react-redux'
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice'
import { toast } from 'react-toastify'
import numberWithCommas from '../../utils/NumberWithCommas'

export default function Transaction({ transaction }) {
    const { name, type, amount, id } = transaction || {}
    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(editActive(transaction))
    }

    const handleDelete = () => {
        dispatch(removeTransaction(id))
        toast.warning('Delete Confirmed', { autoClose: 500 })
    }

    return (
        <div><li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(amount)}</p>
                <button onClick={handleEdit} className="link">
                    <img alt='edit'
                        className="icon"
                        src={editImage}
                    />
                </button>
                <button onClick={handleDelete} className="link">
                    <img alt='delete'
                        className="icon"
                        src={deleteImage}
                    />
                </button>
            </div>
        </li></div>
    )
}
