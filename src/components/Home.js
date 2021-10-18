import { useState } from 'react';
import axios from 'axios';
import './Home.css';
import { convert } from '../Math';



const Home = () => {
    const [format, setFormat] = useState('real');
    const [realVal, setrealVal] = useState('');
    const [binVal, setbinVal] = useState("");
    const [hexVal, sethexVal] = useState('');
    const [sign, setSign] = useState('');
    const [exp, setExp] = useState('');
    const [mantissa, setMantissa] = useState('');
    const [val, setVal] = useState('');


    const handleChange = (event) => {
        const format = event.target.value;
        setFormat(format);
        setbinVal('');
        sethexVal('');
        setrealVal('');
        setVal('');
        setSign('');
        setExp('');
        setMantissa('');
    }

    const submit = (event) => {
            let value = (format === "bin") ? `${sign}|${exp}|${mantissa}` : val;
            let { binVal, realVal, hexVal } = convert(value, format);
            setbinVal(binVal);
            sethexVal(hexVal);
            setrealVal(realVal);
            // axios.post(`${URL}/conversion`, { format, value })
            //     .then((res) => {
            //         const { realVal, binVal, hexVal } = res['data'];
            //         // setbinVal(binVal)
            //         sethexVal(hexVal)
            //         setrealVal(realVal)
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //         alert("Invalid inputs")
            //     })
    }
    return (
        <div className="home">
            <div className="format">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" checked={format === 'real'} onChange={handleChange} name="input_format" value='real' type="radio" id="real" />
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

            {/* Input */}
            <div className="w-75  justify-content-center  d-flex">
                {
                    (format === 'bin') ? (
                        <div className="d-flex">
                            <input type="text" onChange={(e) => setSign(e.target.value)} value={sign} placeholder="sign" style={{ flexBasis: '30%' }} className="form-control" />
                            <input type="text" onChange={(e) => setExp(e.target.value)} value={exp} placeholder="unbiased exponent" className="form-control mx-2" />
                            <input type="text" onChange={(e) => setMantissa(e.target.value)} value={mantissa} placeholder="mantissa" className="form-control" />
                        </div>
                    ) :
                        (<input type="text" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: '30%' }} placeholder="Enter the input"
                            className="form-control"/>)
                }
                <button onClick={submit} type="button" className="btn btn-success mx-3">Convert</button>
            </div>
            {/* Output */}
            <div className="output">
                <div className="outputformat form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="decimal">Float</label>
                    <div className="col-sm-8">
                        <input id="decimal" placeholder="decimal" className="form-control " value={realVal} type="text" disabled />
                    </div>
                </div>
                <div className="row form-group justify-content-left p-3 align-items-center border border-info rounded">
                    <label className="col-sm-2 col-form-label" htmlFor="float">IEEE-754</label>
                    <div className="ieee754 col-sm-10">
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign" placeholder="sign" className="form-control" value={binVal ? ((binVal['sign_bit'] === "1") ? "-1" : "+1") : ""} type="text" disabled />
                            <input id="exponent" placeholder="exponent" className="form-control mx-2" value={binVal ? binVal['exp'] : ""} type="text" disabled />
                            <input id="mantissa" placeholder="mantissa" className="form-control" value={binVal ? binVal['mantissa'] : ''} type="text" disabled />
                        </div>
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign-encode" placeholder="sign (Encoded as)" className="form-control" value={binVal ? binVal['sign_bit'] : ''} type="text" disabled />
                            <input id="exponent-encode" placeholder="exponent (Encoded as)" className="form-control mx-2" value={binVal ? `${parseInt(binVal['exp']) + 127}` : ''} type="text" disabled />
                            <input id="mantissa-encode" placeholder="mantissa (Encoded as)" className="form-control" value={binVal ? `${parseInt(binVal["mantissa_bit"], 2)}` : ""} type="text" disabled />
                        </div>
                        <div className="d-flex justify-content-around p-1">
                            <input id="sign bit" placeholder="sign (binary)" className="form-control" value={binVal ? binVal['sign_bit'] : ''} type="text" disabled />
                            <input id="exponent bits" placeholder="exponent (binary)" className="form-control mx-2" value={binVal ? binVal['exp_bit'] : ''} type="text" disabled />
                            <input id="mantissa bits" placeholder="mantissa (binary)" className="form-control" value={binVal ? binVal['mantissa_bit'] : ''} type="text" disabled />
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