from flask import Flask, request
from flask_cors import CORS
from conversions import real2floatingPoint, real2hex

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello world'

@app.route('/', methods = ['POST'])
def handlePost():
    request_data = request.get_json()
    input = request_data['value']
    format = request_data['format']
    if format == "real":
        input = float(input)
        hexVal = real2hex(input)
        binVal = real2floatingPoint(input)
        realVal = input
    return {'hexVal':hexVal, 'binVal': binVal , 'realVal': realVal}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')