import InventoryManager from './InventoryManager';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <InventoryManager />
      </div>
    </div>
  );
}

export default App;