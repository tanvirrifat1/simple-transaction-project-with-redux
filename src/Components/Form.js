import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createTransaction } from '../features/transaction/transactionSlice'

export default function Form() {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')

    const dispatch = useDispatch()
    const { isLoading, isError, error } = useSelector((state) => state.transaction)

    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createTransaction({ name, type, amount: Number(amount) }))
        toast.success("successfully Done", { autoClose: 500 })
    }

    return (
        <div className="form">
            <form onSubmit={handleCreate}>
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

                <button disabled={isLoading} type='submit' className="btn">Add Transaction</button>

                {!isLoading && isError && <p className='error'>There was an error</p>}

                <button className="btn cancel_edit">Cancel Edit</button>
            </form>
        </div>

    )
}
