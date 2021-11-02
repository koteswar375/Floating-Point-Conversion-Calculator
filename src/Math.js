
export function Convert2Bin(outstring, statstring, signBit, power, rounding) {
    let output = new String()                 //Output

    var binexpnt, index1, index2, cnst, bias, lastbit, rounded, index3, binexpnt2
    var moreBits

    cnst = 2102   // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
    bias = 1024

    //init
    for (index1 = 0; index1 < this.Size; index1++)  this.Result[index1] = 0

    //sign bit
    this.Result[0] = signBit

    //obtain exponent value
    index1 = 0

    if (this.Size === 32) index2 = 9
    else index2 = 12

    if (rounding && (statstring === "normal")) {
        //find most significant bit of significand
        while ((index1 < cnst) && (this.BinVal[index1] !== 1)) index1++

        binexpnt = bias - index1

        //regular normalized numbers
        if (binexpnt >= this.MinExp) {
            //the value is shifted until the most
            index1++    //significant 1 is to the left of the binary
            //point and that bit is implicit in the encoding
        }//if normalized numbers

        //support for zero and denormalized numbers
        //exponent underflow for this precision
        else {
            binexpnt = this.MinExp - 1
            index1 = bias - binexpnt
        }//if zero or denormalized (else section)


        //use round to nearest value mode

        //compute least significant (low-order) bit of significand
        lastbit = this.Size - 1 - index2 + index1

        //the bits folllowing the low-order bit have a value of (at least) 1/2
        if (this.BinVal[lastbit + 1] === 1) {
            rounded = 0

            //odd low-order bit
            if (this.BinVal[lastbit] === 1) {
                //exactly 1/2 the way between odd and even rounds up to the even,
                //so the rest of the bits don't need to be checked to see if the value
                //is more than 1/2 since the round up to the even number will occur
                //anyway due to the 1/2
                rounded = 1
            }//if odd low-order bit

            //even low-order bit
            else  //this.BinVal[lastbit] === 0
            {
                //exactly 1/2 the way between even and odd rounds down to the even,
                //so the rest of the bits need to be checked to see if the value
                //is more than 1/2 in order to round up to the odd number
                index3 = lastbit + 2
                while ((rounded === 0) && (index3 < cnst)) {
                    rounded = this.BinVal[index3]
                    index3++
                }//while checking for more than 1/2

            }//if even low-order bit (else section)

            //do rounding "additions"
            index3 = lastbit
            while ((rounded === 1) && (index3 >= 0)) {
                // 0 + 1 -> 1 result with 0 carry
                if (this.BinVal[index3] === 0) {
                    // 1 result
                    this.BinVal[index3] = 1

                    // 0 carry
                    rounded = 0

                }//if bit is a 0

                // 1 + 1 -> 0 result with 1 carry
                else  //this.BinVal[index3] === 1
                {
                    // 0 result
                    this.BinVal[index3] = 0

                    // 1 carry
                    //          rounded = 1
                }//if bit is a 1 (else section)

                index3--
            }//while "adding" carries from right to left in bits

        }//if at least 1/2

        //obtain exponent value
        index1 = index1 - 2
        if (index1 < 0) index1 = 0

    }//if rounding

    //find most significant bit of significand
    while ((index1 < cnst) && (this.BinVal[index1] !== 1)) index1++

    binexpnt2 = bias - index1

    if (statstring === "normal") {
        binexpnt = binexpnt2

        //regular normalized numbers
        if ((binexpnt >= this.MinExp) && (binexpnt <= this.MaxExp)) {
            //the value is shifted until the most
            index1++                //significant 1 is to the left of the binary
            //point and that bit is implicit in the encoding
        }//if normalized numbers

        //support for zero and denormalized numbers
        //exponent underflow for this precision
        else if (binexpnt < this.MinExp) {
            if (binexpnt2 === bias - cnst)
                //value is truely zero
                this.StatCond = "normal"
            else if (binexpnt2 < this.MinUnnormExp)
                this.StatCond = "underflow"
            else
                this.StatCond = "denormalized"

            binexpnt = this.MinExp - 1
            index1 = bias - binexpnt
        }//if zero or denormalized (else if section)
    }

    else //already special values
    {
        binexpnt = power
        index1 = bias - binexpnt

        if (binexpnt > this.MaxExp)
            binexpnt = this.MaxExp + 1

        else if (binexpnt < this.MinExp)
            binexpnt = this.MinExp - 1

    }//if already special (else section)

    //copy the result
    while ((index2 < this.Size) && (index1 < cnst)) {
        this.Result[index2] = this.BinVal[index1]
        index2++
        index1++
    }//while

    //max exponent for this precision
    if ((binexpnt > this.MaxExp) || (statstring !== "normal")) {
        //overflow of this precision, set infinity
        if (statstring === "normal") {
            binexpnt = this.MaxExp + 1
            this.StatCond = "overflow"
            this.DispStr = "Infinity"

            if (this.Result[0] === 1)
                this.DispStr = "-" + this.DispStr

            if (this.Size === 32) index2 = 9
            else index2 = 12

            //zero the significand
            while (index2 < this.Size) {
                this.Result[index2] = 0
                index2++
            }//while

        }//if overflowed

        else //already special values
        {
            this.StatCond = statstring
            this.DispStr = outstring
        }//if already special (else section)

    }//if max exponent

    //convert exponent value to binary representation
    if (this.Size === 32) index1 = 8
    else index1 = 11
    this.BinaryPower = binexpnt
    binexpnt += this.ExpBias    //bias
    while ((binexpnt / 2) !== 0) {
        this.Result[index1] = binexpnt % 2
        if (binexpnt % 2 === 0) binexpnt = binexpnt / 2
        else binexpnt = binexpnt / 2 - 0.5
        index1 -= 1
    }

    //output binary result
    output = ""
    for (index1 = 0; index1 < this.Size; index1++)
        output = output + this.Result[index1]
    return output

}

export function Dec2Bin(input) {
    var value, intpart, decpart, binexpnt, index1, cnst, bias

    cnst = 2102   // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
    bias = 1024

    //init
    for (index1 = 0; index1 < cnst; index1++)  this.BinVal[index1] = 0

    input = Canonical(input)

    //sign bit
    if (input.charAt(0) === "-")
        this.Result[0] = 1
    else
        this.Result[0] = 0

    //if value magnitude greater than 1.7976931348623157E+308, set infinity
    input = OvfCheck(input)

    if (input.indexOf("Infinity") !== -1) {
        binexpnt = this.MaxExp + 1
        this.StatCond64 = "overflow"
        this.DispStr = input

    }//if greater than 1.7976931348623157E+308

    //Value magnitude is not greater than 1.7976931348623157E+308
    else {

        //if value magnitude less than 2.4703282292062328E-324, set "underflow".
        this.StatCond64 = UndfCheck(input)

        if (this.StatCond64 === "underflow") {
            binexpnt = this.MinExp - 1

        }//if less than 2.4703282292062328E-324

        //Value magnitude is not less than 2.4703282292062328E-324
        else {

            //convert 'input' from string to numeric
            input = input * 1.0

            //convert and seperate input to integer and decimal parts
            value = Math.abs(input)
            intpart = Math.floor(value)
            decpart = value - intpart

            //convert integer part
            index1 = bias
            while (((intpart / 2) !== 0) && (index1 >= 0)) {
                this.BinVal[index1] = intpart % 2
                if (intpart % 2 === 0) intpart = intpart / 2
                else intpart = intpart / 2 - 0.5
                index1 -= 1
            }

            //convert decimal part
            index1 = bias + 1
            while ((decpart > 0) && (index1 < cnst)) {
                decpart *= 2
                if (decpart >= 1) { this.BinVal[index1] = 1; decpart--; index1++ }
                else { this.BinVal[index1] = 0; index1++ }
            }

            //obtain exponent value
            index1 = 0

            //find most significant bit of significand
            while ((index1 < cnst) && (this.BinVal[index1] !== 1)) index1++

            binexpnt = bias - index1

            //support for zero and denormalized numbers
            //exponent underflow for this precision
            if (binexpnt < this.MinExp) {
                binexpnt = this.MinExp - 1

            }//if zero or denormalized

        }//if not less than 2.4703282292062328E-324 (else section)

    }//if not greater than 1.7976931348623157E+308 (else section)

    //output exponent value
    this.BinaryPower = binexpnt


}

function Canonical(input) {
    let output = new String()
    let numerals = new String()
    let expstr = new String()
    let signstr = new String()
    let expsignstr = new String()
    let expstrtmp = new String()

    var locE, stop, expnum, locDPact, locDP, start, MSDfound, index, expdelta
    var expstart, expprecision

    numerals = "0123456789";

    expprecision = 5

    input = input.toUpperCase()

    locE = input.indexOf("E");
    if (locE !== -1) {
        stop = locE
        expstr = input.substring(locE + 1, input.length)
        expnum = expstr * 1
    }
    else {
        stop = input.length
        expnum = 0
    }

    locDPact = input.indexOf(".");
    if (locDPact !== -1)
        locDP = locDPact
    else
        locDP = stop

    start = 0
    if (input.charAt(start) === "-") {
        start++
        signstr = "-"
    }
    else if (input.charAt(start) === "+") {
        start++
        signstr = "+"
    }
    else
        signstr = "+"

    MSDfound = false
    while ((start < stop) && !MSDfound) {
        index = 1
        while (index < numerals.length) {
            if (input.charAt(start) === numerals.charAt(index)) {
                MSDfound = true
                break
            }
            index++
        }
        start++
    }
    start--

    if (MSDfound) {
        expdelta = locDP - start
        if (expdelta > 0)
            expdelta = expdelta - 1

        expnum = expnum + expdelta
    }
    else  //No significant digits found, value is zero
        expnum = 0

    expstrtmp = "" + expnum

    expstart = 0
    if (expstrtmp.charAt(expstart) === "-") {
        expstart++
        expsignstr = "-"
    }
    else
        expsignstr = "+"

    expstr = "E" + expsignstr

    index = 0
    while (index < expprecision - expstrtmp.length + expstart) {
        expstr += "0"
        index++
    }

    expstr += expstrtmp.substring(expstart, expstrtmp.length)

    output = signstr

    if (locDPact === start + 1) {
        output += input.substring(start, stop)
    }
    else if (stop === start + 1) {
        output += input.substring(start, stop)
        output += "."
    }
    else if (locDPact < start) {
        output += input.substring(start, start + 1)
        output += "."
        output += input.substring(start + 1, stop)
    }
    else if (locDPact !== -1) {
        output += input.substring(start, start + 1)
        output += "."
        output += input.substring(start + 1, locDPact)
        output += input.substring(locDPact + 1, stop)
    }
    else {
        output += input.substring(start, stop)
        output += "."
    }

    output += expstr

    return output;
}

function MostSigOrder(input) {
    let output = new String()
    let expstr = new String()

    var expprecision, expbias, stop, expnum, index

    expprecision = 5
    expbias = 50000

    stop = input.indexOf("E");

    output = input.substring(stop + 1, input.length)
    expnum = output * 1
    expnum += expbias

    expstr = "" + expnum

    output = expstr

    index = 0
    while (index < expprecision - expstr.length) {
        output = "0" + output
        index++
    }

    output += input.substring(1, 2)
    output += input.substring(3, stop)

    return output;
}

function A_gt_B(A, B) {
    let numerals = new String()

    var greater, stop, index, Adigit, Bdigit

    numerals = "0123456789";

    greater = false

    if (A.length > B.length)
        stop = A.length
    else
        stop = B.length

    index = 0
    while (index < stop) {
        if (index < A.length)
            Adigit = numerals.indexOf(A.charAt(index))
        else
            Adigit = 0

        if (index < B.length)
            Bdigit = numerals.indexOf(B.charAt(index))
        else
            Bdigit = 0

        if (Adigit < Bdigit)
            break
        else if (Adigit > Bdigit) {
            greater = true
            break
        }

        index++
    }//end while

    return greater;
}

function OvfCheck(input) {
    let output = new String()

    //Is value magnitude greater than +1.7976931348623157E+00308
    if (A_gt_B(MostSigOrder(input), "5030817976931348623157")) {
        output = "Infinity"
        if (input.charAt(0) === "-")
            output = "-" + output
    }
    else
        output = input

    return output;
}

function UndfCheck(input) {
    let output = new String()

    //Is value magnitude less than +2.4703282292062328E-00324
    if (A_gt_B("4967624703282292062328", MostSigOrder(input)))
        output = "underflow"
    else
        output = "normal"

    return output;
}

function RemoveBlanks(input) {
    let output = new String()

    var start, stop

    start = 0
    while ((input.charAt(start) === " ") && (start < input.length))
        start++

    stop = input.length - 1
    while ((input.charAt(stop) === " ") && (stop >= 0))
        stop--

    output = input.substring(start, stop + 1)

    return output
}

export function Convert2Hex() {
    let output = new String()
    let numerals = new String()

    var temp, index, i

    numerals = "0123456789ABCDEF"

    //convert binary result to hex and output
    for (index = 0; index < this.Size; index += 4) {
        temp = 0
        for (i = 0; i < 4; i++)
            temp += Math.pow(2, 3 - i) * this.Result[index + i]

        output = output + numerals.charAt(temp)
    }
    return output
}

function numStrClipOff(input, precision) {
    let result = new String()
    let numerals = new String()
    let tempstr = new String()
    let expstr = new String()
    let signstr = new String()

    var locE, stop, expnum, locDP, start, MSD, MSDfound, index, expdelta, digits
    var number

    numerals = "0123456789";

    tempstr = input.toUpperCase()

    locE = tempstr.indexOf("E");
    if (locE !== -1) {
        stop = locE
        expstr = input.substring(locE + 1, input.length)
        expnum = expstr * 1
    }
    else {
        stop = input.length
        expnum = 0
    }

    if (input.indexOf(".") === -1) {
        tempstr = input.substring(0, stop)
        tempstr += "."
        if (input.length !== stop)
            tempstr += input.substring(locE, input.length)

        input = tempstr

        locE = locE + 1
        stop = stop + 1
    }

    locDP = input.indexOf(".");

    start = 0
    if (input.charAt(start) === "-") {
        start++
        signstr = "-"
    }
    else
        signstr = ""

    MSD = start
    MSDfound = false
    while ((MSD < stop) && !MSDfound) {
        index = 1
        while (index < numerals.length) {
            if (input.charAt(MSD) === numerals.charAt(index)) {
                MSDfound = true
                break
            }
            index++
        }
        MSD++
    }
    MSD--

    if (MSDfound) {
        expdelta = locDP - MSD
        if (expdelta > 0)
            expdelta = expdelta - 1

        expnum = expnum + expdelta

        expstr = "e" + expnum
    }
    else  //No significant digits found, value is zero
        MSD = start

    digits = stop - MSD

    tempstr = input.substring(MSD, stop)

    if (tempstr.indexOf(".") !== -1)
        digits = digits - 1

    number = digits
    if (precision < digits)
        number = precision

    tempstr = input.substring(MSD, MSD + number + 1)

    if ((MSD !== start) || (tempstr.indexOf(".") === -1)) {
        result = signstr
        result += input.substring(MSD, MSD + 1)
        result += "."
        result += input.substring(MSD + 1, MSD + number)

        while (digits < precision) {
            result += "0"
            digits += 1
        }

        result += expstr
    }
    else {
        result = input.substring(0, start + number + 1)

        while (digits < precision) {
            result += "0"
            digits += 1
        }

        if (input.length !== stop)
            result += input.substring(locE, input.length)
    }

    return result;
}

function numCutOff(input, precision) {
    let result = new String()
    let tempstr = new String()

    var temp = input;
    if (temp < 1)
        temp += 1;

    tempstr = "" + temp;

    tempstr = numStrClipOff(tempstr, precision);

    if (temp === input)
        result = tempstr.substring(0, 1);
    else
        result = "0";

    result += tempstr.substring(1, tempstr.length);

    return result;
}

export function Convert2Dec() {
    let output = new String()

    var s, i, dp, val, hid, temp, decValue, power

    if (this.Size === 32) s = 9
    else s = 12

    if ((this.BinaryPower < this.MinExp) || (this.BinaryPower > this.MaxExp)) {
        dp = 0
        val = 0
    }
    else {
        dp = - 1
        val = 1
    }

    for (i = s; i < this.Size; i++)
        val += parseInt(this.Result[i]) * Math.pow(2, dp + s - i)

    decValue = val * Math.pow(2, this.BinaryPower)

    if (this.Size === 32) {
        s = 8
        if (val > 0) {
            power = Math.floor(Math.log(decValue) / Math.LN10)
            decValue += 0.5 * Math.pow(10, power - s + 1)
            val += 5E-8
        }
    }
    else s = 17

    if (this.Result[0] === 1) decValue = - decValue

    //the system refuses to display negative "0"s with a minus sign
    this.DecValue = "" + decValue
    if ((this.DecValue === "0") && (this.Result[0] === 1))
        this.DecValue = "-" + this.DecValue

    this.DecValue = numStrClipOff(this.DecValue, s)

    output = numCutOff(val, s)

    return output
}

//object construction function
function ieee(Size) {

    this.Size = Size
    this.BinaryPower = 0
    this.DecValue = ""
    this.DispStr = ""
    this.Convert2Bin = Convert2Bin   //convert input to bin.
    this.Convert2Hex = Convert2Hex   //convert bin. to hex.
    this.Convert2Dec = Convert2Dec   //convert bin. significand to dec.
    this.Dec2Bin = Dec2Bin           //convert dec. to bin.
    this.StatCond = "normal"
    this.StatCond64 = "normal"
    this.BinString = ""
    // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
    this.BinVal = new Array(2102)    //Binary Representation
    if (Size === 32) {
        this.ExpBias = 127
        this.MaxExp = 127
        this.MinExp = -126
        this.MinUnnormExp = -149
        this.Result = new Array(32)
    }
    else if (Size === 64) {
        this.ExpBias = 1023
        this.MaxExp = 1023
        this.MinExp = -1022
        this.MinUnnormExp = -1074
        this.Result = new Array(64)
    }

}

export function float2Hex(d) {
    var sign = "0";
    d = (typeof (d) === 'string') ? parseFloat(d) : d;
    if (d < 0.0) {
        sign = "1";
        d = -d;
    }

    var mantissa = parseFloat(d).toString(2);

    var exponent = 0;

    if (mantissa.substr(0, 1) === "0") {
        exponent = mantissa.indexOf('.') - mantissa.indexOf('1') + 127;
    }
    else {
        exponent = mantissa.indexOf('.') - 1 + 127;
    }

    mantissa = mantissa.replace(".", "");
    mantissa = mantissa.substr(mantissa.indexOf('1') + 1);

    if (mantissa.length > 23) {
        mantissa = mantissa.substr(0, 23);
    }
    else {
        while (mantissa.length < 23) {
            mantissa = mantissa + "0";
        }
    }

    var exp = parseFloat(exponent).toString(2);

    while (exp.length < 8) {
        exp = "0" + exp;
    }

    var numberFull = sign + exp + mantissa;

    return parseInt(numberFull, 2).toString(16);
}

export function float2ieee754(input) {
    /*
      in this javascript program, bit positions are numbered
      0 ~ 32/64 from left to right instead of right to left, the
      way the output is presented
    */
    input = (typeof (input) !== 'string') ? input.toString() : input;
    let ieee32 = new ieee(32)
    let ieee64 = new ieee(64)
    let rounding = true;
    var index1, cnst

    //   input = obj.input.value
    input = RemoveBlanks(input)

    ieee64.Dec2Bin(input)
    ieee64.BinString =
        ieee64.Convert2Bin(ieee64.DispStr, ieee64.StatCond64, ieee64.Result[0],
            ieee64.BinaryPower, false)
    //   obj.bin64_0.value = ieee64.BinString.substring(0, 1)
    //   obj.bin64_1.value = ieee64.BinString.substring(1, 12)
    //   if ((ieee64.BinaryPower < ieee64.MinExp) ||
    //       (ieee64.BinaryPower > ieee64.MaxExp))
    //   {
    //     obj.bin64_12.value = "  "
    //     obj.bin64_12.value += ieee64.BinString.substring(12, 13)
    //     obj.bin64_12.value += "."
    //     obj.bin64_12.value += ieee64.BinString.substring(13, 64)
    //   }
    //   else
    //   {
    //     obj.bin64_12.value = "1 ."
    //     obj.bin64_12.value += ieee64.BinString.substring(12, 64)
    //   }
    //   obj.stat64.value = ieee64.StatCond
    //   obj.binpwr64.value = ieee64.BinaryPower
    //   obj.binpwr64f.value = ieee64.BinaryPower + ieee64.ExpBias
    //   obj.dec64sig.value = ieee64.Convert2Dec()
    //   if (ieee64.DispStr !== "")
    //   {
    //     obj.dec64.value = ieee64.DispStr
    //     obj.dec64sig.value = ""
    //   }
    //   else
    //     obj.dec64.value = ieee64.DecValue
    //   obj.hex64.value = ieee64.Convert2Hex()

    cnst = 2102         // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
    for (index1 = 0; index1 < cnst; index1++)
        ieee32.BinVal[index1] = ieee64.BinVal[index1]

    ieee32.BinString =
        ieee32.Convert2Bin(ieee64.DispStr, ieee64.StatCond64, ieee64.Result[0],
            ieee64.BinaryPower, rounding)
    //   obj.bin32_0.value = ieee32.BinString.substring(0, 1)
    //   obj.bin32_1.value = ieee32.BinString.substring(1, 9)
    //   if ((ieee32.BinaryPower < ieee32.MinExp) ||
    //       (ieee32.BinaryPower > ieee32.MaxExp))
    //   {
    //     obj.bin32_9.value = "  "
    //     obj.bin32_9.value += ieee32.BinString.substring(9, 10)
    //     obj.bin32_9.value += "."
    //     obj.bin32_9.value += ieee32.BinString.substring(10, 32)
    //   }
    //   else
    //   {
    //     obj.bin32_9.value = "1 ."
    //     obj.bin32_9.value += ieee32.BinString.substring(9, 32)
    //   }
    //   obj.stat32.value = ieee32.StatCond
    //   obj.binpwr32.value = ieee32.BinaryPower
    //   obj.binpwr32f.value = ieee32.BinaryPower + ieee32.ExpBias
    //   obj.dec32sig.value = ieee32.Convert2Dec()
    //   if (ieee32.DispStr !== "")
    //   {
    //     obj.dec32.value = ieee32.DispStr
    //     obj.dec32sig.value = ""
    //   }
    //   else
    //     obj.dec32.value = ieee32.DecValue
    //   obj.hex32.value = ieee32.Convert2Hex()

    //   if ((ieee64.DispStr !== "") && (ieee32.DispStr !== ""))
    //     obj.entered.value = ieee64.DispStr
    //   else
    //     obj.entered.value = input * 1.0
    let binStr = ieee32.BinString;
    let sign_bit = binStr[0];
    let exp_bit = binStr.substring(1, 9);
    let mantissa_bit = binStr.substring(9, 32);
    let exp = ieee32.BinaryPower;
    let mantissa = ieee32.Convert2Dec();
    return { sign_bit, exp_bit, mantissa_bit, exp, mantissa };
}


export function hex2Float(str) {
    var float = 0;
    let int = 0, multi = 1;
    let re = /^0x[0-9a-fA-F]+$/g;

    str = (str.substring(0, 2) !== '0x') ? `0x${str}` : str;
    if (str.length > 10) throw 'Value out of range';
    if (!re.test(str)) throw "Invalid input!";

    if (/^0x/.exec(str)) {
        int = parseInt(str, 16);
    } else {
        for (var i = str.length - 1; i >= 0; i -= 1) {
            if (str.charCodeAt(i) > 255) {
                throw 'Invalid input!'
            }
            int += str.charCodeAt(i) * multi;
            multi *= 256;
        }
    }
    let sign = (int >>> 31) ? -1 : 1;
    let exp = (int >>> 23 & 0xff) - 127;
    let mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
    for (i = 0; i < mantissa.length; i += 1) {
        float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
        exp--;
    }
    return float * sign;
}

export function hex2ieee754(str) {
    let floatVal = hex2Float(str);
    return float2ieee754(floatVal);
}

function ieee754ToFloat(s, e, m) {
    let sign = parseInt(s);
    let exp = parseInt(e);
    let f = parseFloat(m);
    if (exp == 0 && f == 0) return 0;
    return Math.pow(-1, sign) * (1+f) * Math.pow(2, exp - 127);
}

function ieeee754ToHex(s, e, m) {
    // validateiee754(s,e,m)
    let float = ieee754ToFloat(s, e, m);
    return float2Hex(float);
}

export function convert(input, format) {
    if (!format || !input) throw 'Invalid input!';
    let realVal, hexVal, binVal;
    if (format == "float") {
        // input = parseFloat(input);
        if (!(parsefloat(input))) throw 'Input entered is invalid';
        hexVal = float2Hex(input);
        binVal = float2ieee754(input);
        realVal = input;
    }
    else if (format == "hex") {
        realVal = hex2Float(input);
        hexVal = input;
        binVal = hex2ieee754(input);
    }
    else if (format == "ieee754") {
        let parts = input.split("|");
        let s = parts[0], e = parts[1], m = parts[2];
        validateiee754(s, e, m)
        hexVal = ieeee754ToHex(s, e, m);
        realVal = ieee754ToFloat(s, e, m);
        binVal = float2ieee754(realVal);
    }

    return { 'hexVal': hexVal, 'binVal': binVal, 'realVal': realVal }
}

function testInt(num) {
    return (/^\d+$/g).test(num);
}

function validateiee754(s, e, m) {
    if (!testInt(s) || !testInt(e) || !parsefloat(m)) throw 'Invalid input';
    let sign = parseInt(s);
    let exp = parseInt(e);
    m = parseFloat(m);
    if (isNaN(sign) || isNaN(exp) || isNaN(m)) throw 'Invalid input';
    if (!(sign == 0 || sign == 1)) throw 'invalid sign input';

    // Special cases
    if (m != 0 && exp === 255) throw 'special case identified: NaN';
    if (sign == 0 && m == 0 && exp === 255) throw 'special case identified: +Infinity';
    if (sign == 1 && m == 0 && exp === 255) throw 'special case identified: -Infinity';

    if (exp === 0) {
        (m !== 0) ? alert('special case identified: Denormalized numbers') : alert('special case identified: Zero');
        return;
    }

    // Special cases
    if (exp < 0 || exp > 255) throw 'exponent value out of range';
    if (m < 0 || m > 1) throw 'mantissa value out of range';



}

function parsefloat(num) {
    let re = /^[+-]?\d+(\.\d+)?$/;
    return re.test(num);
}


export function operate(val1, val2, operation, format) {

    if (!format || !val1 || !val2 || !operation) throw "Invalid input!";
    let realVal, hexVal, binVal, output;

    if (format == "float") {
        if (!(parsefloat(val1)) || !(parsefloat(val2))) throw 'Input entered is invalid';
        output = compute(val1, val2, operation);
    }
    else if (format == "hex") {
        val1 = hex2Float(val1);
        val2 = hex2Float(val2);
        output = compute(val1, val2, operation);
    }
    else if (format == "ieee754") {
        let parts1 = val1.split("|");
        let parts2 = val2.split("|");
        let s1 = parts1[0], e1 = parts1[1], m1 = parts1[2];
        let s2 = parts2[0], e2 = parts2[1], m2 = parts2[2];
        let floatVal1 = ieee754ToFloat(s1, e1, m1);
        let floatVal2 = ieee754ToFloat(s2, e2, m2);

        output = compute(floatVal1, floatVal2, operation);
    }

    hexVal = float2Hex(output);
    binVal = float2ieee754(output);
    realVal = output;
    return { 'hexVal': hexVal, 'binVal': binVal, 'realVal': realVal }

}


function compute(val1, val2, operation) {
    let output = 0;
    if (operation == "add") output = parseFloat(val1) + parseFloat(val2)
    else if (operation == "subtract") output = parseFloat(val1) - parseFloat(val2)
    else if (operation == "multiply") output = parseFloat(val1) * parseFloat(val2)
    return output
}