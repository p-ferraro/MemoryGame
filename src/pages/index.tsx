import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {

  const newGrid: number[][] =  [[], [], [], []]
  const [grid, setGrid] = useState([[], [], [], []])

  const gridValues = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]

  function shuffleArray(array:number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return (array)
  }

  useEffect(() => {


    const shuffledArray = shuffleArray(gridValues)
    let gridValuesIndex = 0
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        newGrid[row][col] = shuffledArray[gridValuesIndex]
        gridValuesIndex++;
      }
    }
    setGrid(newGrid)
  }, [])

  const [compare, setCompare] = useState([])
  const [guess1, setGuess1] = useState<number[]>([])
  const [guessCount, setGuessCount] = useState(0)

  const handleCardClicked = (rowIndex: number, colIndex: number) => {
    

    const s = document.getElementById(('span ' + rowIndex.toString()) + (colIndex.toString()));
    s?.classList.remove("items")
    const d = document.getElementById(('div ' + rowIndex.toString()) + (colIndex.toString()));
    d?.classList.add('unclickable')

    compare.push(grid[rowIndex][colIndex])
    if (compare.length == 2) {
      setGuessCount(guessCount + 1)
      if (compare[0] === compare[1]) {
        setCompare([])
      }
      else {
        setCompare([])
        setTimeout(() => {
          s?.classList.add("items")
          d?.classList.remove('unclickable')
        }, 1000)
        setTimeout(() => {
          document.getElementById('span ' + guess1[0].toString() + (guess1[1].toString()))!.classList.add("items")
          document.getElementById('div ' + guess1[0].toString() + (guess1[1].toString()))!.classList.remove("unclickable")
        }, 1000)
      }
    }
    else {
      setGuess1([rowIndex, colIndex])
    }

  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4c6a86] to-[#393c6c]">
        <div className="container flex flex-col items-center justify-center gap-5 px-4 py-16 text-slate-200">
          <div className="cursor-pointer hover:text-slate-400" onClick={() => {
            const shuffledArray = shuffleArray(gridValues)
            let gridValuesIndex = 0
            for (let row = 0; row < 4; row++) {
              for (let col = 0; col < 4; col++) {
                newGrid[row][col] = shuffledArray[gridValuesIndex]
                gridValuesIndex++;
                document.getElementById('span ' + row.toString() + col.toString())?.classList.add("items")
                document.getElementById('div ' + row.toString() + col.toString())?.classList.remove("unclickable")
              }
            }
            setGuessCount(0)
            setGrid(newGrid)
          }}>Refresh Grid </div>
          <div>Guesses: {guessCount}</div>
          {grid.map((row, rowIndex) => (
            <div className="flex flex-row gap-5" key={rowIndex}>
              {row.map((number, colIndex) => (
                <div className="bg-slate-700 p-5 rounded-lg cursor-pointer hover:bg-slate-900 " id={('div ' + rowIndex.toString()) + (colIndex.toString())} key={colIndex} onClick={() => handleCardClicked(rowIndex, colIndex)}><span id={'span ' + (rowIndex.toString()) + (colIndex.toString())} className="items">{number}</span></div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
