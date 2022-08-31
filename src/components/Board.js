import "./Board.css";
import { useState, useEffect, useRef } from "react";

const Board = ({ reset, setReset, winner, setWinner }) => {

	// Sıranın kimde olduğunu anlamak için bir turn state tanımladık
	const [turn, setTurn] = useState(0);
	// Kutuların içini kontrol etmek için bir data state tanımladık
	const [data, setData] = useState(['', '', '', '', '',
		'', '', '', ''])

	const boardRef = useRef(null);


	const draw = (event, index) => {

		// Seçilen kutu boşsa ve herhangi bir kazanan yoksa kutuların içine X ve O yazacağız
		if (data[index - 1] === '' && winner === '') {
			
			// turn değişkeni 0'a eşitse X, değilse O harfi yazıyoruz
			const current = turn === 0 ? "X" : "O"
			data[index - 1] = current;
			event.target.innerText = current;

			// Sırayı diğer oyuncuya geçiriyoruz
			setTurn(turn === 0 ? 1 : 0)
		}
	}

	// Bu useEffect'i oyunun başında tüm kutuları boşaltmak için kullanacağız.
	useEffect(() => {

		setData(['', '', '', '', '', '', '', '', '']);

		const cells = boardRef.current.children

		for (let i = 0; i < 9; i++) {
			cells[i].innerText = '';
		}

		// turn değişkenini tekrar 0'a eşitliyoruz
		setTurn(0);

		// Kazananı sıfırlıyoruz
		setWinner('');
		setReset(false);
	}, [reset, setReset, setWinner])


	// Bu useEffect'i kazananı kontrol etmek için kullanacağız.
	useEffect(() => {

		// Tüm satırlardaki kazanma şartlarını değerlendiriyoruz
		const checkRow = () => {
			let ans = false;
			for (let i = 0; i < 9; i += 3) {
				ans |= (data[i] === data[i + 1] &&
				data[i] === data[i + 2] &&
				data[i] !== '')
			}
			return ans;
		}

		// Sütunlardaki kazanma şartlarını değerlendiriyoruz
		const checkCol = () => {
			let ans = false;
			for (let i = 0; i < 3; i++) {
				ans |= (data[i] === data[i + 3] &&
				data[i] === data[i + 6] &&
				data[i] !== '')
			}
			return ans;
		}

		// Çarpraz kazanma şartlarını değerlendiriyoruz
		const checkDiagonal = () => {
			return ((data[0] === data[4] &&
			data[0] === data[8] && data[0] !== '') ||
			(data[2] === data[4] && data[2] === data[6] &&
			data[2] !== ''));
		}

		// Kazananı tayin etmek için tüm şartlarımızı bir fonksiyonda dönüyoruz
		const checkWin = () => {
			return (checkRow() || checkCol() || checkDiagonal());
		}

		// Son olarak beraberliği de kontrol ediyoruz
		const checkTie = () => {
			let count = 0;
			data.forEach((cell) => {
				if (cell !== '') {
					count++;
				}
			})
			return count === 9;
		}

		// Kazananı belirliyoruz, turn değişkeni en son kimde kaldıysa diğer kişiyi kazanan ilan ediyoruz
		if (checkWin()) {
			setWinner(turn === 0 ? "2. Oyuncu Kazandı" :
			"1. Oyuncu Kazandı");
		} else if (checkTie()) {

			// Beraberlik durumu için kontrol yapıyoruz
			setWinner("Beraberlik!");
		}

	})

	return (
		<div ref={boardRef} className="board">
			{/* draw fonksiyonumuzu kullanarak kutulara çizimler yapılamasını sağlıyoruz */}
			<div className="input input-1"
				onClick={(e) => draw(e, 1)}></div>
			<div className="input input-2"
				onClick={(e) => draw(e, 2)}></div>
			<div className="input input-3"
				onClick={(e) => draw(e, 3)}></div>
			<div className="input input-4"
				onClick={(e) => draw(e, 4)}></div>
			<div className="input input-5"
				onClick={(e) => draw(e, 5)}></div>
			<div className="input input-6"
				onClick={(e) => draw(e, 6)}></div>
			<div className="input input-7"
				onClick={(e) => draw(e, 7)}></div>
			<div className="input input-8"
				onClick={(e) => draw(e, 8)}></div>
			<div className="input input-9"
				onClick={(e) => draw(e, 9)}></div>
		</div>
	)
}

export default Board;
