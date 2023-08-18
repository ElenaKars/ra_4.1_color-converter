import React, { useState } from 'react';
import './App.css';

interface ColorConverterProps {
  backgroundColor: string;
}

const ColorConverter: React.FC<ColorConverterProps> = ({ backgroundColor }) => {
  const [hexColor, setHexColor] = useState<string>('');
  const [rgbColor, setRgbColor] = useState<string | null>(null);

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setHexColor(inputValue);
//checking by test()
    if (/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      const r = parseInt(inputValue.slice(1, 3), 16);
      const g = parseInt(inputValue.slice(3, 5), 16);
      const b = parseInt(inputValue.slice(5, 7), 16);
      setRgbColor(`rgb(${r}, ${g}, ${b})`);
    } else {
      setRgbColor(null);
    }
//another way of checking
// if (inputValue.length === 7 && inputValue[0] === '#' && /^[0-9A-Fa-f]+$/.test(inputValue.slice(1))) {
//   const r = parseInt(inputValue.slice(1, 3), 16);
//   const g = parseInt(inputValue.slice(3, 5), 16);
//   const b = parseInt(inputValue.slice(5, 7), 16);
//   setRgbColor(`rgb(${r}, ${g}, ${b})`);
// } else {
//   setRgbColor(null);
// }    
  };

  const backgroundColorStyle = {
    backgroundColor: rgbColor !== null ? rgbColor : backgroundColor,
  };

  return (
    <div className="color-converter" style={backgroundColorStyle}>
      <div className="converter-container">
        <label htmlFor="hexInput">Введите цвет (HEX):</label>
        <input
          type="text"
          id="hexInput"
          value={hexColor}
          onChange={handleHexChange}
          maxLength={7}
        />
        {rgbColor !== null && <p>RGB: {rgbColor}</p>}
        {rgbColor === null && hexColor.length === 7 && <p>Ошибка!</p>}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <ColorConverter backgroundColor="#f0f0f0" />
    </div>
  );
}

export default App;
