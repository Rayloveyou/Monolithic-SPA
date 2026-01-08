import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductCreated = () => {
    // Increment trigger to refresh product list
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>E-commerce Product Manager</h1>
      </header>

      <main className="app-main">
        <div className="container">
          <ProductForm onProductCreated={handleProductCreated} />
          <ProductList refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
}

export default App;
