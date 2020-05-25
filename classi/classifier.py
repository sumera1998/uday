import os
import pickle
import numpy as np
from keras import backend as K
from keras.models import model_from_json
from keras.preprocessing.sequence import pad_sequences


max_features, max_len = 20000, 100


def predict(text,level):
    K.clear_session()
    data_dir = 'resources/'

    text = np.array(text).reshape(1, )

    with open('resources/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    list_tokenized_test = tokenizer.texts_to_sequences(text)
    x_test = pad_sequences(list_tokenized_test, maxlen=max_len)  # Restrict each row in df to max_len = 100 words

    with open(os.path.join(data_dir, 'model.json'), 'r') as json_file:
        loaded_model_json = json_file.read()
    model = model_from_json(loaded_model_json)

    model.load_weights(os.path.join(data_dir, 'weights.h5'))
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

    y_test = model.predict([x_test], verbose=1)

    level = level/100

    if len(np.nonzero(y_test > level)[0]) == 0:
        predictions = ['Not Abusive','Level - '+str(round(y_test[0][0], 2))+'%']
    else:
        print(y_test[0][0])
        predictions = ['Abusive','Level - '+str(round(y_test[0][0], 2))+'%']

    K.clear_session()
    return predictions
