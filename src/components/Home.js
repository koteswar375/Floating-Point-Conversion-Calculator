import { useState } from 'react';
import axios from 'axios';
import './Home.css';


const Home = () => {
    const [format, setFormat] = useState('real');
    const [realVal, setrealVal] = useState('');
    const [binVal, setbinVal] = useState('');
    const [hexVal, sethexVal] = useState('');


    const handleChange = (event) => {
        const val = event.target.value;
        setFormat(val)
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value;
            axios.post('http://10.57.213.113:5000/', { format, value })
                .then((res) => {
                    const { realVal, binVal, hexVal } = res['data'];
                    setbinVal(binVal)
                    sethexVal(hexVal)
                    setrealVal(realVal)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    return (
        <div className="home">
            <div className="format">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" checked onChange={handleChange} name="input_format" value='real' type="radio" id="real" />
                    <label className="form-check-label" htmlFor="real">Decimal</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format" value='bin' type="radio" id="bin" />
                    <label className="form-check-label" htmlFor="bin">Floating point</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format" value='hex' type="radio" id="hex" />
                    <label className="form-check-label" htmlFor="hex">HexaDecimal</label>
                </div>
            </div>
            <input type="text" style={{ width: '30%', margin: '10px' }} placeholder="Enter the input" className="form-control" onKeyPress={handleEnter} />
            <div className="output">
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="decimal">Decimal</label>
                    <div className="col-sm-8">
                        <input id="decimal" placeholder="decimal" className="form-control " value={realVal} type="text" disabled />
                    </div>
                </div>
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="float">Floating Point</label>
                    <div className="col-sm-8">
                        <input id="float" placeholder="sign | mantissa | exponent" className="form-control" value={binVal} type="text" disabled/>
                    </div>
                </div>
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="hex">Hexadecimal</label>
                    <div className="col-sm-8">
                        <input id="hex" placeholder="hexadecimal" className="form-control" value={hexVal} type="text" disabled />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;