import { useState } from 'react';
import './App.css';

const App = () => {
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState('');
  const [qrSize, setQrSize] = useState('150');

  const generateQr = async () => {
    setLoading(true);
    try {
      const url = ` https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error('Erroe Gerating QR Code', error);
    } finally {
      setLoading(false);
    }
  };
  const downloadQR = async () => {
    fetch(img)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        // blob is binary data,so for convert to image we use next step
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <>
      <div className="app-container">
        <h1>QR Code Generator</h1>
        {loading && <p>Please Wait...</p>}
        {img && <img className="qr-code-image" src={img} alt="" />}
        <div>
          <label htmlFor="dataInput" className="input-label">
            Data For QR Code
          </label>
          <input
            type="text"
            placeholder="Enter data for QR Code"
            id="dataInput"
            value={qrData}
            onChange={e => setQrData(e.target.value)}
          />
          <label htmlFor="sizeInput" className="input-label">
            Image size(eg.,150)
          </label>
          <input
            type="text"
            placeholder="Enter image size"
            id="sizeInput"
            value={qrSize}
            onChange={e => setQrSize(e.target.value)}
          />
          <div className="btn">
            <button
              onClick={generateQr}
              className="generate-btn"
              disabled={loading}
            >
              Generate QR Code
            </button>

            <button className="dwnld-btn" onClick={downloadQR}>
              Download QR Code
            </button>
          </div>
        </div>
        <p className="footer">Designed by Dilna</p>
      </div>
    </>
  );
};

export default App;
