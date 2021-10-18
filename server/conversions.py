import binascii
import struct
def __binaryOfFraction__(fraction):
 
    binary = str()
 
    while (fraction):
        fraction *= 2
        if (fraction >= 1):
            int_part = 1
            fraction -= 1
        else:
            int_part = 0
    
        binary += str(int_part)
    return binary

def __float_bin__(my_number, places = 3):
    my_whole, my_dec = str(my_number).split(".")
    my_whole = int(my_whole)
    res = (str(bin(my_whole))+".").replace('0b','')
 
    for x in range(places):
        my_dec = str('0.')+str(my_dec)
        temp = '%1.20f' %(float(my_dec)*2)
        my_whole, my_dec = temp.split(".")
        res += my_whole
    return res

def convertToInt(mantissa_str):
 
    # variable to make a count
    # of negative power of 2.
    power_count = -1
 
    # variable to store
    # float value of mantissa.
    mantissa_int = 0
 
    # Iterations through binary
    # Number. Standard form of
    # Mantissa is 1.M so we have
    # 0.M therefore we are taking
    # negative powers on 2 for
    # conversion.
    for i in mantissa_str:
 
        # Adding converted value of
        # Binary bits in every
        # iteration to float mantissa.
        mantissa_int += (int(i) * pow(2, power_count))
 
        # count will decrease by 1
        # as we move toward right.
        power_count -= 1
         
    # returning mantissa in 1.M form.
    return (mantissa_int + 1)
 
 
 
def real2hex(n) :
    # identifying whether the number
    # is positive or negative
    sign = 0
    if n < 0 :
        sign = 1
        n = n * (-1)
    p = 30
    # convert float to binary
    dec = __float_bin__  (n, places = p)
 
    dotPlace = dec.find('.')
    onePlace = dec.find('1')
    # finding the mantissa
    if onePlace > dotPlace:
        dec = dec.replace(".","")
        onePlace -= 1
        dotPlace -= 1
    elif onePlace < dotPlace:
        dec = dec.replace(".","")
        dotPlace -= 1
    mantissa = dec[onePlace+1:]
 
    # calculating the exponent(E)
    exponent = dotPlace - onePlace
    exponent_bits = exponent + 127
 
    # converting the exponent from
    # decimal to binary
    exponent_bits = bin(exponent_bits).replace("0b",'')
 
    mantissa = mantissa[0:23]
 
    # the IEEE754 notation in binary    
    final = str(sign) + exponent_bits.zfill(8) + mantissa
 
    # convert the binary to hexadecimal
    hstr = '0x%0*X' %((len(final) + 3) // 4, int(final, 2))
    return hstr

def real2floatingPoint(real_no):
 
    sign_bit = 0
 
    if(real_no < 0):
        sign_bit = 1
 
    real_no = abs(real_no)
    int_str = bin(int(real_no))[2 : ]
    print(int_str)
    fraction_str = __binaryOfFraction__(real_no - int(real_no))
    
    ind = int_str.index('1')
    exp_str = bin((len(int_str) - ind - 1) + 127)[2 : ]
    mant_str = int_str[ind + 1 : ] + fraction_str
    mant_str = mant_str + ('0' * (23 - len(mant_str)))
 
    return str(sign_bit) + " | " + str(exp_str) + " | " + str(mant_str)[:23]
    
def hex2real(data):
    return struct.unpack('!f', bytes.fromhex(data))[0]

def hex2float(input):
    realconv = struct.unpack('!f', bytes.fromhex(input))[0]
    hextofloatres = real2floatingPoint(realconv)
    return hextofloatres

def float2hex(input):
    realVal = float2real(input)
    return real2hex(realVal)

def float2real(ieee_32):
    sign_bit = int(ieee_32[0])
    
    exponent_bias = int(ieee_32[2 : 10], 2)
 
    exponent_unbias = exponent_bias - 127
   
    mantissa_str = ieee_32[11 : ]
 
    mantissa_int = convertToInt(mantissa_str)

    real_no = pow(-1, sign_bit) * mantissa_int * pow(2, exponent_unbias)
    return real_no
    
