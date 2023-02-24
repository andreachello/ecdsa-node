import server from "./server";
import localWallet from "./LocalWallet";

function Wallet({ user, setUser, balance, setBalance }) {
  async function onUserSelection(evt) {
   const selectedUser = evt.target.value
   setUser(selectedUser)

   if (selectedUser) {
    const address = localWallet.getAddress(selectedUser)
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
       <select onChange={onUserSelection} value={user}>
        <option value="">--- please choose a user wallet ---</option>
        {localWallet.USERS.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
       </select>
      </label>

      <div className="balance">Address: {localWallet.getAddress(user)}</div>
      <div>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
