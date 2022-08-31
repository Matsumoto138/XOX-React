import { useState } from 'react';
import Board from './components/Board';
import Info from "./components/Info";

import "./App.css";


function App() {
	// Oyun sonunda oyunu sıfırlamak için reset state'i tanımladık
	const [reset, setReset] = useState(false);
	// Kazananı yazdırmak için de winner state'i tanımladık
	// Bu state Board.js dosyasında kullanılacak
	const [winner, setWinner] = useState('');

	// Tüm kutular boş olsun diye en başta true atıyoruz
	const resetBoard = () => {
		setReset(true);
	}

	return (
		<div className="App">
			
			<div className={`winner ${winner !== '' ? '' : 'shrink'}`}>
				
				<div className='winner-text'>{winner}</div>
				
				<button onClick={() => resetBoard()}>
					Sıfırla
				</button>
			</div>

			<Board reset={reset} setReset={setReset} winner={winner}
				setWinner={setWinner} />
			<Info />
		</div>
	);
}

export default App;
