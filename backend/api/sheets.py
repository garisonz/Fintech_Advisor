import pandas as pd

data1 = pd.read_excel('C:/Users/erich/OneDrive/Desktop/hackthon proj/Fintech_Advisor/backend/data/bank.xlsx', nrows=20)

print(data1.head())

cols = ['Account No']

def data():
    df = data1.drop(cols, axis=1)
    result = df.to_json(orient="split")
    return result