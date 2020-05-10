from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from flair.models import TextClassifier
from flair.data import Sentence

flask_app = Flask(__name__)
app = Api(app = flask_app,
		  version = "1.0",
		  title = "ML React App",
		  description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params',
				  {'text': fields.String(required = True,
				  							   description="Text Field 1",
    					  				 	   help="Text Field 1 cannot be blank")})

classifier = TextClassifier.load('en-sentiment')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)
	def post(self):
		try:
			data = request.json['text'].replace('\n', ' ')
			text = Sentence(data)
			classifier.predict(text)
			sentiment = text.labels

			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "Mood: " + str(sentiment)
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})
