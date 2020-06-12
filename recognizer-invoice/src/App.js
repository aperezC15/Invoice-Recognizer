import React from 'react';

import InvoiceState from './context/InvoiceState';
import Barra from './componentes/home.js';
import Stepper from './view/stepper.js';
import './App.css';

function App() {
	return (
		<div className="App">
			<Barra />
			<InvoiceState>
				<Stepper />
			</InvoiceState>
		</div>
	);
}

export default App;
