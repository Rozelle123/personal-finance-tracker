import React from 'react';
import './styles.css';
import TextField from '@mui/material/TextField';
import CollapsibleTable from './TransactionsTable';


const ExpenseTracker = () => {  
    return (
        <div className="container">       
            <div className='form-container'>
                <h1>Personal Finance Tracker</h1>
                    <div className='current-container'>
                        <TextField
                        id="outlined-read-only-input"
                        label="CURRENT EXPENSE"
                        defaultValue='$1500'
                        slotProps={{
                            input: {
                            readOnly: true,
                            style: { fontWeight: "bold", fontSize: "18px"  }
                            },
                        }}
                        />
                        <TextField
                        id="outlined-read-only-input"
                        label="CURRENT BALANCE"
                        defaultValue='$3000'
                        slotProps={{
                            input: {
                            readOnly: true,
                            style: { fontWeight: "bold", fontSize: "18px"  }
                            },
                        }} />
                    </div>                
            </div>            
             <CollapsibleTable />            
        </div>
    );
    }
    export default ExpenseTracker;