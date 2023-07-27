export default {
	id: 'twilio',
	handler: (router, { env }) => {
		const axios = require('axios');
		const twilio_host = "https://api.twilio.com";
		const twilio_sid = env.TWILIO_ACCOUNT_SID;
		const twilio_token = env.TWILIO_AUTH_TOKEN;
		const twilio_from = env.TWILIO_PHONE_NUMBER;
		const twilio_api = axios.create({
		 	baseURL: twilio_host,
			auth: {
				username: twilio_sid,
				password: twilio_token,
			},
		});

		router.get('/*', (req, res) => {
			twilio_api.get(req.url).then((response) => {
				res.json(response.data);
			}).catch((error) => {
				res.send(error);
			});
		});

		router.post('/*', (req, res) => {
			twilio_api.post(req.url, new URLSearchParams(req.body)).then((response) => {
				res.json(response.data);
			}).catch((error) => {
				res.send(error);
			});
		});
	},
};