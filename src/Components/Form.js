import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { changeTransactions, createTransaction } from '../features/transaction/transactionSlice'

export default function Form() {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')

    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()
    const { isLoading, isError } = useSelector((state) => state.transaction)
    const { editing } = useSelector((state) => state.transaction)

    useEffect(() => {
        const { id, name, type, amount } = editing || {}
        if (id) {
            setEditMode(true)
            setName(name)
            setType(type)
            setAmount(amount)
        } else {
            setEditMode(false)
            reset()
        }
    }, [editing, type, name, amount])

    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createTransaction({ name, type, amount: Number(amount) }))
        reset()
        if (dispatch) {
            toast.success("successfully Done", { autoClose: 500 })
        } else {
            toast.error("something wrong", { autoClose: 500 })
        }

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(changeTransactions({
            id: editing?.id,
            data: {
                name: editing?.name,
                amount: editing?.amount,
                type: editing?.type
            }
        }))
        reset()
    }

    const reset = () => {
        setName("")
        setType("")
        setAmount("")
    }

    const cancelEditMode = () => {
        reset();
        setEditMode(false);
    };


    return (
        <div className="form">
            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <h3>Add new transaction</h3>

                <div className="form-group">
                    <label >Name</label>
                    <input
                        type="text"
                        required
                        name="name"
                        placeholder="enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="type"
                            required
                            checked={type === "income"}
                            onChange={(e) => setType("income")}
                        />
                        <label >Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            required
                            checked={type === "expense"}
                            onChange={(e) => setType("expense")}
                        />
                        <label >Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="enter amount"
                        name="amount"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} type='submit' className="btn">
                    {editMode ? "Update Transaction" : "Add Transaction"}
                </button>

                {!isLoading && isError && <p className='error'>There was an error</p>}

                {editMode && (
                    <button className="btn cancel_edit" onClick={cancelEditMode}>
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>

    )
}
