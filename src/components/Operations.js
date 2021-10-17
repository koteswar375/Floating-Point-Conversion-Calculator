import { useState } from 'react';
import axios from 'axios';
import './Operations.css';
import URL from '../config';


const Operations = () => {
    const [format, setFormat] = useState('real');
    const [operation, setOperation] = useState('')
    const [realVal, setrealVal] = useState('');
    const [binVal, setbinVal] = useState('');
    const [hexVal, sethexVal] = useState('');
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');

    const handleChange = (event) => {
        const val = event.target.value;
        setFormat(val);
        setbinVal('')
        sethexVal('')
        setrealVal('')
    }
    const handleSelect = (event)=> {
        const val = event.target.value;
        setOperation(val);
    }
    const submit = (event) => {
            axios.post(`${URL}/operation`, { format, val1, val2, operation })
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
    return (
        <div className="container">
            <div className="format">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" checked={format==="real"} onChange={handleChange} name="input_format1" value='real' type="radio" id="real" />
                    <label className="form-check-label" htmlFor="real">Floating point</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format1" value='bin' type="radio" id="bin" />
                    <label className="form-check-label" htmlFor="bin">IEE754</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format1" value='hex' type="radio" id="hex" />
                    <label className="form-check-label" htmlFor="hex">HexaDecimal</label>
                </div>
            </div>
            <div className="input">
                <div>
                    <input onChange= {(e)=>setVal1(e.target.value)} type="text" style={{ margin: '10px' }} placeholder="Enter the first value" className="form-control" />
                    <input onChange= {(e)=>setVal2(e.target.value)} type="text" style={{ margin: '10px' }} placeholder="Enter the second value" className="form-control" />
                </div>
                <select onChange= {handleSelect} value={operation} style={{ width:'30%'}} className="form-select" aria-label="Default select example">
                    <option defaultValue>Select Operation</option>
                    <option value="add">Addition</option>
                    <option value="subtract">Subtraction</option>
                    <option value="multiply">Multiplication</option>
                </select>
                <button onClick={submit} type="button" className="btn btn-primary">Submit</button>
            </div>
            <div className="output">
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="decimal">Floating point</label>
                    <div className="col-sm-8">
                        <input id="decimal" placeholder="decimal" className="form-control " value={realVal} type="text" disabled />
                    </div>
                </div>
                <div className="row form-group justify-content-left p-2 align-items-center border border-info rounded">
                    <label className="col-sm-2 col-form-label" htmlFor="float">IEE754</label>
                    <div className="ieee754 col-sm-8">
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
                    <label className="col-sm-2 col-form-label" htmlFor="hex">Hexadecimal</label>
                    <div className="col-sm-8">
                        <input id="hex" placeholder="hexadecimal" className="form-control" value={hexVal} type="text" disabled />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Operations;