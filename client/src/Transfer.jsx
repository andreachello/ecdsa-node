import { useState } from "react";
import server from "./server";
import wallet from "./LocalWallet";

function Transfer({ user, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // build the transaction payload composed of:
    // - The message (amount to transfer and recipient)
    // - the signature of the transactiom built from the user private key
    // - message inside the wallet
    const message = {
      amount: parseInt(sendAmount),
      recipient
    }
    const signature = await wallet.sign(user, message)
    const transaction = {
      message,
      signature
    }

    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
