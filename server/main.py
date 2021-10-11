from flask import Flask, request
from flask_cors import CORS
from conversions import real2floatingPoint, real2hex

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
        binVal = real2floatingPoint(input)
        realVal = input
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
        output = 0
        if operation == "add":
            output = float(val1) + float(val2)
        elif operation == "subtract":
            output = float(val1) - float(val2)
        elif operation == "multiply":
            output = float(val1) * float(val2)        
        hexVal = real2hex(output)
        binVal = real2floatingPoint(output)
        realVal = output
    
    return {'hexVal':hexVal, 'binVal': binVal , 'realVal': realVal}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')