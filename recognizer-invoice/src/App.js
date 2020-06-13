import React from 'react';

import InvoiceState from './context/InvoiceState';
import Recognizer from './view/Recognizer';
import Barra from './componentes/home.js';
// import Stepper from './view/stepper.js';
import './App.css';

function App() {
	return (
		<div className="App">
			<Barra />
			<InvoiceState>
				<Recognizer />
			</InvoiceState>
		</div>
	);
}

export default App;
