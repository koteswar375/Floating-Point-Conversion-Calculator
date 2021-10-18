import { useState } from 'react';
import axios from 'axios';
import './Home.css';
import URL from '../config';
import compute from '../Math';


const Home = () => {
    const [format, setFormat] = useState('real');
    const [realVal, setrealVal] = useState('');
    const [binVal, setbinVal] = useState("");
    const [hexVal, sethexVal] = useState('');
    const [val, setVal] = useState('');


    const handleChange = (event) => {
        const format = event.target.value;
        setFormat(format);
        setbinVal('');
        sethexVal('');
        setrealVal('');
        setVal('');
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value;
            compute(value,true)
            axios.post(`${URL}/conversion`, { format, value })
                .then((res) => {
                    const { realVal, binVal, hexVal } = res['data'];
                    setbinVal(binVal)
                    sethexVal(hexVal)
                    setrealVal(realVal)
                })
                .catch((error) => {
                    console.log(error)
                    alert("Invalid inputs")
                })
        }
    }
    return (
        <div className="home">
            <div className="format">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" checked={format==='real'} onChange={handleChange} name="input_format" value='real' type="radio" id="real" />
                    <label className="form-check-label" htmlFor="real">Float</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format" value='bin' type="radio" id="bin" />
                    <label className="form-check-label" htmlFor="bin">IEEE-754</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format" value='hex' type="radio" id="hex" />
                    <label className="form-check-label" htmlFor="hex">Hex</label>
                </div>
            </div>
            <input type="text" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: '30%', margin: '10px' }} placeholder="Enter the input" className="form-control" onKeyPress={handleEnter} />
            <div className="output">
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="decimal">Float</label>
                    <div className="col-sm-8">
                        <input id="decimal" placeholder="decimal" className="form-control " value={realVal} type="text" disabled />
                    </div>
                </div>
                <div className="row form-group justify-content-left p-2 align-items-center border border-info rounded">
                    <label className="col-sm-2 col-form-label" htmlFor="float">IEEE-754</label>
                    <div className="ieee754 col-sm-10">
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign" placeholder="sign"  className="form-control" value={binVal? ((binVal['sign'] === "1") ? "-1": "+1"): ""} type="text" disabled />
                            <input id="exponent" placeholder="exponent"  className="form-control mx-2" value={binVal? `${parseInt(binVal['exp_e']) - 127}` : ""} type="text" disabled />
                            <input id="mantissa" placeholder="mantissa"  className="form-control" value={binVal?binVal['mantissa_e']:''} type="text" disabled />
                        </div>
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign-encode" placeholder="sign (Encoded as)"  className="form-control" value={binVal?binVal['sign']:''} type="text" disabled />
                            <input id="exponent-encode" placeholder="exponent (Encoded as)"  className="form-control mx-2" value={binVal?binVal['exp_e']:''} type="text" disabled />
                            <input id="mantissa-encode" placeholder="mantissa (Encoded as)"  className="form-control" value={binVal ? binVal["mantissa_int"]:""} type="text" disabled />
                        </div>
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign bit" placeholder="sign (binary)"  className="form-control" value={binVal?binVal['sign']:''} type="text" disabled />
                            <input id="exponent bits" placeholder="exponent (binary)"  className="form-control mx-2" value={binVal?binVal['exp']:''} type="text" disabled />
                            <input id="mantissa bits" placeholder="mantissa (binary)"  className="form-control" value={binVal?binVal['mantissa']:''} type="text" disabled />
                        </div>
                    </div>
                </div>
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="hex">Hex</label>
                    <div className="col-sm-8">
                        <input id="hex" placeholder="hexadecimal" className="form-control" value={hexVal} type="text" disabled />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;