import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { SampleProvider } from 'providers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<SampleProvider>
			<App />
		</SampleProvider>
	</React.StrictMode>
);
