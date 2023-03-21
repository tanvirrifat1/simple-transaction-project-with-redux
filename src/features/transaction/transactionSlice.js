import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getTransaction, editTransaction, addTransaction, deleteTransaction } from "./transcationAPI"

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {}
}

export const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async () => {
    const transaction = await getTransaction()

    return transaction;
})

export const createTransaction = createAsyncThunk("transaction/createTransactions", async (data) => {
    const transaction = await addTransaction(data)

    return transaction;
})

export const changeTransactions = createAsyncThunk("transaction/changeTransactions", async ({ data, id }) => {
    const transaction = await editTransaction(data, id)

    return transaction;
})

export const removeTransactions = createAsyncThunk("transaction/removeTransactions", async (id) => {
    const transaction = await deleteTransaction(id)

    return transaction;
})


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload
        },
        editInActive: (state) => {
            state.editing = {}
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchTransactions
            .addCase(fetchTransactions.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.transactions = action.payload
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.transactions = []
                state.error = action.error?.message
            })
            // createTransactions
            .addCase(createTransaction.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.transactions.push(action.payload)
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.error = action.error?.message
            })
            // changeTransactions
            .addCase(changeTransactions.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(changeTransactions.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false

                const indexToUpdate = state.transactions.findIndex(
                    (t) => t.id === action.payload.id
                );

                state.transactions[indexToUpdate] = action.payload;

            })
            .addCase(changeTransactions.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.error = action.error?.message
            })
            // removeTransactions
            .addCase(removeTransactions.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(removeTransactions.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false

                state.transactions = state.transactions.filter(
                    (t) => t.id !== action.payload)
            })
            .addCase(removeTransactions.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.error = action.error?.message
            })
    }
})

export default transactionSlice.reducer
export const { editActive, editInActive } = transactionSlice.actions