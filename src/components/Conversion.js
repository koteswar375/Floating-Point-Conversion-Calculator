import { useState, useEffect, useContext } from 'react';
import './Conversion.css';
import { convert } from '../Math';
import { HistoryContext } from '../Contexts/history.context';
import axios from 'axios';
import URL from '../config';



const Conversion = () => {
    const [format, setFormat] = useState('float');
    const [realVal, setrealVal] = useState('');
    const [binVal, setbinVal] = useState("");
    const [hexVal, sethexVal] = useState('');
    const [sign, setSign] = useState('');
    const [exp, setExp] = useState('');
    const [mantissa, setMantissa] = useState('');
    const [val, setVal] = useState('');
    const historyContext = useContext(HistoryContext);


    useEffect(() => {
        document.title = "IEEE 754 Converter";
        getHistory();
      }, []);

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

    const getHistory = () => {
        axios.get(`${URL}/items`)
              .then((res) => {
                  console.log(res)
                //   setData(res.data);
                  historyContext.setHistory(res.data);
              })
              .catch((error) => {
                  console.log(error)
                  alert("Invalid inputs")
              })
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

    const submit = (event) => {
        let value = (format === "ieee754") ? `${sign}|${exp}|${mantissa}` : val;
        let binVal, realVal, hexVal;
        try {
            ({ binVal, realVal, hexVal } = convert(value, format));
            addToHistory({Type: 'conversion', InputType: format});
            setbinVal(binVal);
            sethexVal(hexVal);
            setrealVal(realVal);
        } catch (e) {
            alert(e);
            setbinVal('');
            sethexVal('');
            setrealVal('');
        }

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
            <div className="border border-info p-2 mb-2">
                (-1)<sup>sign  </sup> (1 + fraction) x 2 <sup>exponent - bias</sup>
            </div>
            
            <div className="format">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" checked={format === 'float'} onChange={handleChange} name="input_format" value='float' type="radio" id="float" />
                    <label className="form-check-label" htmlFor="float">Float</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format" value='ieee754' type="radio" id="ieee754" />
                    <label className="form-check-label" htmlFor="ieee754">IEEE-754</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChange} name="input_format" value='hex' type="radio" id="hex" />
                    <label className="form-check-label" htmlFor="hex">Hex</label>
                </div>
            </div>

            {/* Input */}
            <div className="w-75  justify-content-center  d-flex">
                {
                    (format === 'ieee754') ? (
                        <div className="d-flex">
                            <input type="text" onChange={(e) => setSign(e.target.value)} value={sign} placeholder="sign" style={{ flexBasis: '30%' }} className="form-control" />
                            <input type="text" onChange={(e) => setExp(e.target.value)} value={exp} placeholder="exponent(0-255)" className="form-control mx-2" />
                            <input type="text" onChange={(e) => setMantissa(e.target.value)} value={mantissa} placeholder="fraction(0-1)" className="form-control" />
                        </div>
                    ) :
                        (<input type="text" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: '30%' }} placeholder="Enter a value"
                            className="form-control" />)
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
                            <input id="exponent" placeholder="biased exponent (exp-127)" className="form-control mx-2" value={binVal ? binVal['exp'] : ""} type="text" disabled />
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
export default Conversion;