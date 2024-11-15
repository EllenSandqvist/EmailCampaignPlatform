// a test route that is used to test routes without having to log in, once the route works we move it to a handler instead.

import express from 'express';
import { grammarCheckEmail } from '../handlers/openaiHandler.js';

import { RequestGrammarSchema } from '../types/openaiTypes.js';
const router = express.Router();

router.post('/test', async (req, res) => {
  try {
    const requestData = RequestGrammarSchema.parse(req.body);
    await grammarCheckEmail(requestData, res);
    console.log('test');
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

export { router };
