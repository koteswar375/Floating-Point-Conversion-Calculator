import { useState } from 'react';
import './Operations.css';
import { operate } from '../Math';
import axios from 'axios';
import URL from '../config';


const Operations = () => {
    const [format, setFormat] = useState('float');
    const [operation, setOperation] = useState('')
    const [realVal, setrealVal] = useState('');
    const [binVal, setbinVal] = useState('');
    const [hexVal, sethexVal] = useState('');
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [iee754Val1, setiee754Val1] = useState({ sign: '', exp: '', mantissa: '' });
    const [iee754Val2, setiee754Val2] = useState({ sign: '', exp: '', mantissa: '' });


    const handleChange = (event) => {
        const val = event.target.value;
        setFormat(val);
        setbinVal('')
        sethexVal('')
        setrealVal('')
        setVal1('')
        setVal2('')
        setOperation('')
        setiee754Val1({ sign: '', exp: '', mantissa: '' });
        setiee754Val2({ sign: '', exp: '', mantissa: '' });
    }
    const handleSelect = (event) => {
        const val = event.target.value;
        setOperation(val);
    }

    const handleInput1Change = (e) => {
        setVal1(e.target.value)
    }

    const submit = (event) => {
        let value1 = (format === "ieee754") ? `${iee754Val1.sign}|${iee754Val1.exp}|${iee754Val1.mantissa}` : val1;
        let value2 = (format === "ieee754") ? `${iee754Val2.sign}|${iee754Val2.exp}|${iee754Val2.mantissa}` : val2;
        let binVal, realVal, hexVal;
        try {
            ({ binVal, realVal, hexVal } = operate(value1, value2, operation, format));
            addToHistory({Type: 'operation', InputType: format});
            setbinVal(binVal);
            sethexVal(hexVal);
            setrealVal(realVal);
        } catch (e) {
            alert(e);
            setbinVal('')
            sethexVal('')
            setrealVal('')
        }

        
    }

    const addToHistory = ({Type, InputType}) => {
        axios.post(`${URL}/items`, { Type, InputType })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error)
                alert("Invalid inputs")
            })
    }
    return (
        <div className="container">
            <div className="border border-info p-2 mb-2">
                (-1)<sup>sign  </sup> (1 + fraction) x 2 <sup>exponent - bias</sup>
            </div>
            <div className="format">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" checked={format === "float"} onChange={handleChange} name="input_format1" value='float' type="radio" id="reafloatl" />
                    <label className="form-check-label" htmlFor="float">Float</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format1" value='ieee754' type="radio" id="ieee754" />
                    <label className="form-check-label" htmlFor="ieee754">IEE754</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format1" value='hex' type="radio" id="hex" />
                    <label className="form-check-label" htmlFor="hex">Hex</label>
                </div>
            </div>
            <div className="input">
                {
                    (format === 'ieee754') ? (
                        <div>
                            <div className="d-flex mx-2">
                                <input type="text" val={iee754Val1.sign} onChange={(e) => setiee754Val1({ sign: e.target.value, exp: iee754Val1.exp, mantissa: iee754Val1.mantissa })} placeholder="sign" style={{ flexBasis: '30%' }} className="form-control" />
                                <input type="text" val={iee754Val1.exp} onChange={(e) => setiee754Val1({ sign: iee754Val1.sign, exp: e.target.value, mantissa: iee754Val1.mantissa })} placeholder="exponent(0-255)" className="form-control mx-2" />
                                <input type="text" val={iee754Val1.mantissa} onChange={(e) => setiee754Val1({ sign: iee754Val1.sign, exp: iee754Val1.exp, mantissa: e.target.value })} placeholder="fraction(0-1)" className="form-control" />
                            </div>
                            <div className="d-flex m-2">
                                <input type="text" val={iee754Val2.sign} onChange={(e) => setiee754Val2({ sign: e.target.value, exp: iee754Val2.exp, mantissa: iee754Val2.mantissa })} placeholder="sign" style={{ flexBasis: '30%' }} className="form-control" />
                                <input type="text" val={iee754Val2.exp} onChange={(e) => setiee754Val2({ sign: iee754Val2.sign, exp: e.target.value, mantissa: iee754Val2.mantissa })} placeholder="exponent(0-255)" className="form-control mx-2" />
                                <input type="text" val={iee754Val2.mantissa} onChange={(e) => setiee754Val2({ sign: iee754Val2.sign, exp: iee754Val2.exp, mantissa: e.target.value })} placeholder="fraction(0-1)" className="form-control" />
                            </div>
                        </div>
                    ) :

                        (<div style={{ flexBasis: "40%" }}>
                            <input onChange={handleInput1Change} type="text" value={val1} placeholder="Enter the first value" className="form-control" />
                            <input onChange={(e) => setVal2(e.target.value)} value={val2} type="text" placeholder="Enter the second value" className="form-control my-2" />
                        </div>)
                }
                <select onChange={handleSelect} value={operation} style={{ width: '30%' }} className="form-select mx-2" aria-label="Default select example">
                    <option defaultValue>Select Operation</option>
                    <option value="add">Addition</option>
                    <option value="subtract">Subtraction</option>
                    <option value="multiply">Multiplication</option>
                </select>
                <button onClick={submit} type="button" className="btn btn-success">Submit</button>
            </div>

            {/* Output */}
            <div className="output">
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="decimal">Float</label>
                    <div className="col-sm-8">
                        <input id="decimal" placeholder="decimal" className="form-control " value={realVal} type="text" disabled />
                    </div>
                </div>
                <div className="row form-group justify-content-left p-2 align-items-center border border-info rounded  p-3">
                    <label className="col-sm-2 col-form-label" htmlFor="float">IEEE-754</label>
                    <div className="ieee754 col-sm-10">
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign" placeholder="sign" className="form-control" value={binVal ? ((binVal['sign_bit'] === "1") ? "-1" : "+1") : ""} type="text" disabled />
                            <input id="exponent" placeholder="biased exponent (exp-127)(exponent-127)" className="form-control mx-2" value={binVal ? binVal['exp'] : ""} type="text" disabled />
                            <input id="mantissa" placeholder="(1+fraction)" className="form-control" value={binVal ? binVal['mantissa'] : ''} type="text" disabled />
                        </div>

                        <div className="d-flex justify-content-around p-1">
                            <input id="sign bit" placeholder="sign (binary)" className="form-control" value={binVal ? binVal['sign_bit'] : ''} type="text" disabled />
                            <input id="exponent bits" placeholder="exponent (binary)" className="form-control mx-2" value={binVal ? binVal['exp_bit'] : ''} type="text" disabled />
                            <input id="mantissa bits" placeholder="mantissa (binary)" className="form-control" value={binVal ? binVal['mantissa_bit'] : ''} type="text" disabled />
                        </div>
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign-encode" placeholder="sign (Encoded as)" className="form-control" value={binVal ? binVal['sign_bit'] : ''} type="text" disabled />
                            <input id="exponent-encode" placeholder="exponent (Encoded as)" className="form-control mx-2" value={binVal ? `${parseInt(binVal['exp']) + 127}` : ''} type="text" disabled />
                            <input id="mantissa-encode" placeholder="mantissa (Encoded as)" className="form-control" value={binVal ? `${parseInt(binVal["mantissa_bit"], 2)}` : ""} type="text" disabled />
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

export default Operations;