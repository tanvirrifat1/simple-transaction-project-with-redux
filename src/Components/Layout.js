import React from 'react'

export default function Layout({ children }) {
    return (
        <div className="App">
            <div class="header">
                <h1>Expense Tracker</h1>
            </div>

            <div className='main'>
                <div className="container"> {children}</div>
            </div>

            <div className="footer">&copy;2023 Learn with Rifat</div>

        </div>
    )
}
