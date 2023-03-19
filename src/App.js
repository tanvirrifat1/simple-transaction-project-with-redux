import Balance from "./Components/Balance";
import Form from "./Components/Form";
import Layout from "./Components/Layout";
import Transactions from "./Components/Transactions/Transactions";

function App() {
    return (
        <Layout>
            <Balance />
            <Form />
            <Transactions />
        </Layout>
    );
}

export default App;
