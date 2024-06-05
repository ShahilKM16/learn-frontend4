// Define a component named AddTransaction which takes a prop addTransaction
export const AddTransaction = ({ addTransaction }) => {
    // Define state variables for text and amount
    const [text, setText] = useState(''); // Initialize text state variable
    const [amount, setAmount] = useState(0); // Initialize amount state variable
  
    // Function to handle form submission
    const onSubmit = e => {
      e.preventDefault(); // Prevent default form submission
  
      // Create a new transaction object
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000), // Generate a random id
        text, // Get text value
        amount: +amount // Get amount value
      };
  
      // Call the addTransaction function with the new transaction
      addTransaction(newTransaction);
  
      // Reset text and amount state variables
      setText('');
      setAmount(0);
    };
  
    // Render the AddTransaction component
    return (
      <>
        {/* Heading */}
        <h3>Add new transaction</h3>
        {/* Form */}
        <form onSubmit={onSubmit}>
          {/* Text input */}
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
          </div>
          {/* Amount input */}
          <div className="form-control">
            <label htmlFor="amount">Amount (negative - expense, positive - income)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
          </div>
          {/* Submit button */}
          <button className="btn">Add transaction</button>
        </form>
      </>
    );
  };
  