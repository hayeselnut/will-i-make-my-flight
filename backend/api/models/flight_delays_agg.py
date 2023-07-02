import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn import metrics, linear_model
from sklearn.preprocessing import PolynomialFeatures
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from os.path import relpath
import os

def predict_delay(airport, airline, flight_departure_time):
    # Load in Aggregated DF
    agg = pd.read_csv(relpath('./models/delay_agg.csv'))
    agg = agg.loc[agg['OP_UNIQUE_CARRIER'] == airline].reset_index(drop=True)

    # ------------------------- Encode ------------------------
    label_encoder = LabelEncoder()
    integer_encoded = label_encoder.fit_transform(agg['ORIGIN'])

    # correspondance between the codes and tags of the airports
    zipped = zip(integer_encoded, agg['ORIGIN'])
    label_airports = list(set(list(zipped)))
    label_airports.sort(key = lambda x:x[0])

    onehot_encoder = OneHotEncoder(sparse=False)
    integer_encoded = integer_encoded.reshape(len(integer_encoded), 1)
    onehot_encoded = onehot_encoder.fit_transform(integer_encoded)

    b = np.array(agg['CRS_DEP_HOUR'])
    b = b.reshape(len(b),1)
    X = np.hstack((onehot_encoded, b))
    Y = np.array(agg['MEAN'])
    Y = Y.reshape(len(Y), 1)

    # ---------------------- Regresssion ----------------------
    poly = PolynomialFeatures(degree = 2)
    regr = linear_model.LinearRegression()
    X_ = poly.fit_transform(X)
    regr.fit(X_, Y)

    result = regr.predict(X_)
    print("MSE =", metrics.mean_squared_error(result, Y))

    # number of predictions where the differences with real values is greater than 15 minutes
    icount = 0
    for i, val in enumerate(Y):
        if abs(val-result[i]) > 15: icount += 1
    '{:.2f}%'.format(icount / len(result) * 100)

    index = agg.loc[(agg['ORIGIN'] == airport) & (agg['CRS_DEP_HOUR'] == flight_departure_time.hour)].index
    return result[index][0][0], metrics.mean_squared_error(result, Y)


if __name__ == "__main__":
    print(predict_delay('JFK', 'AA', datetime(2022, 8, 22, 5, 10)))