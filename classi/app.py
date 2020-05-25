from flask import Flask, render_template
from classifier import predict


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/results/<data>/<data1>')
def results(data,data1):
    text_to_classify = data
    level = int(data1)
    pred = predict(text_to_classify,level)
    return render_template('results.html', pred=pred, text_to_classify=text_to_classify)


if __name__ == '__main__':
    app.run()
