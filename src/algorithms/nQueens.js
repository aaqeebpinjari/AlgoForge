// src/algorithms/nQueens.js
/*
 * N-Queens Backtracking Algorithm with visualization hooks
 * Places N queens on an N×N board so that no two attack each other.
*/
export async function nQueensWithStop
(
    board,
    setArray,        // not used but kept for signature consistency
    setColorArray,   // visualization hook(opt)
    delay,
    stopRef,         // allows stopping visualization midway
    updateStats      // not used here, but included for consistency
) 
{
    const n = board.length;
    const solutions = [];

    const isSafe = (row, col) => 
    {
        for (let j = 0; j < col; j++) if (board[row][j] === 'Q') return false;
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;
        for (let i = row + 1, j = col - 1; i < n && j >= 0; i++, j--) if (board[i][j] === 'Q') return false;
        return true;
    };

  async function place(col) 
    {
        if (stopRef.current) return;

        if (col === n) 
        {
            const solution = board.map(r => r.join(''));
            solutions.push(solution);
            return;
        }

        for (let row = 0; row < n; row++) 
        {
            if (isSafe(row, col)) 
            {
                board[row][col] = 'Q';
                // Optional visualization delay
                if (setColorArray) setColorArray([[row, col]]);
                if (delay) await new Promise(res => setTimeout(res, delay));

                await place(col + 1);
                board[row][col] = '.';
            }
        }
    }

  await place(0);
  return solutions;
}
