def operate(val1, val2, operation):
    output = 0
    if operation == "add":
        output = float(val1) + float(val2)
    elif operation == "subtract":
        output = float(val1) - float(val2)
    elif operation == "multiply":
        output = float(val1) * float(val2)
    return output