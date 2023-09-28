export const Square = ({ children, isSelected, updateBoard, index }) => {
    const classNameSquare = `square ${isSelected ? 'is-selected' : ''}`
    
    const handleClick = () =>{
      updateBoard(index)
    }
    return (
      <div onClick={handleClick} className={classNameSquare}> 
         {children}
      </div>
      )
  };