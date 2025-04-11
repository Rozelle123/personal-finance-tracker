import logo from './logo.svg';
import './App.css';
import ExpenseTracker from './ExpenseTracker';
import TransactionChart from './TransactionChart';

function App() {
  return (
    <div className="App">     
      <div className='expense-tracker'>
       <ExpenseTracker />   
       </div>
       <div className='main-chart-container'>
        <TransactionChart />
       </div>
    </div>
  );
}

export default App;
