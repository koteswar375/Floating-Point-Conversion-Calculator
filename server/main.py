from flask import Flask, request
from flask_cors import CORS
from conversions import real2floatingPoint, real2hex, hex2real, hex2float, float2hex, float2real, convertToInt
from operations import operate
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello world'

@app.route('/conversion', methods = ['POST'])
def handlePost():
    request_data = request.get_json()
    input = request_data['value']
    format = request_data['format']
    if not format or not input:
        return 'bad request', 400
    if format == "real":
        input = float(input)
        hexVal = real2hex(input)
        binaryString = real2floatingPoint(input)
        sign, exp, mantissa = binaryString.split(" | ")
        binVal = {"sign":sign,"exp":exp,"mantissa":mantissa, "sign_e":sign,"exp_e":int(exp,2),
        "mantissa_e":convertToInt(mantissa),"mantissa_int": int(mantissa,2) }
        realVal = input
    elif format == "hex":
        hexVal = input
        realVal = hex2real(input)
        binaryString = hex2float(input)
        sign, exp, mantissa = binaryString.split(" | ")
        binVal = {"sign":sign,"exp":exp,"mantissa":mantissa, "sign_e":sign,"exp_e":int(exp,2),
        "mantissa_e":convertToInt(mantissa),"mantissa_int": int(mantissa,2) }
    elif format == "bin":
        binVal = input
        realVal = float2real(input)
        hexVal = float2hex(input)
        
    return {'hexVal':hexVal, 'binVal': binVal , 'realVal': realVal}

@app.route('/operation', methods = ['POST'])
def handleOperation():
    request_data = request.get_json()
    val1 = request_data['val1']
    val2 = request_data['val2']
    operation = request_data['operation']
    format = request_data['format']
    if not format or not val1 or not val2 or not operation:
        return 'bad request', 400
    if format == "real":
        val1 = float(val1)
        val2 = float(val2)
        output = operate(val1, val2, operation)        
        hexVal = real2hex(output)
        binVal = real2floatingPoint(output)
        realVal = output
    elif format == "hex":
        val1 = hex2real(val1)
        val2 = hex2real(val2)
        output = operate(val1, val2, operation)        
        hexVal = real2hex(output)
        binVal = real2floatingPoint(output)
        realVal = output
    elif format == "bin":
        val1 = float2real(val1)
        val2 = float2real(val2)
        output = operate(val1, val2, operation)        
        hexVal = real2hex(output)
        binVal = real2floatingPoint(output)
        realVal = output
    
    return {'hexVal':hexVal, 'binVal': binVal , 'realVal': realVal}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')