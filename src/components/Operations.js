import { useState } from 'react';
import axios from 'axios';
import './Operations.css';


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
        event.preventDefault();
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
            axios.post('http://192.168.0.10:5000/operation', { format, val1, val2, operation })
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
                    <input className="form-check-input" checked onChange={handleChange} name="input_format1" value='real' type="radio" id="real" />
                    <label className="form-check-label" htmlFor="real">Decimal</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format1" value='bin' type="radio" id="bin" />
                    <label className="form-check-label" htmlFor="bin">Floating point</label>
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
                    <label className="col-sm-2 col-form-label" htmlFor="decimal">Decimal</label>
                    <div className="col-sm-8">
                        <input id="decimal" placeholder="decimal" className="form-control " value={realVal} type="text" disabled />
                    </div>
                </div>
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="float">Floating Point</label>
                    <div className="col-sm-8">
                        <input id="float" placeholder="sign | mantissa | exponent" className="form-control" value={binVal} type="text" disabled />
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