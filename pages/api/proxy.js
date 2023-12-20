import axios from 'axios';

// proxy.js
export default async (req, res) => {
    try {
      let params = req.body;

      // Set page size
params.page_size = 10;
  
      // Filter out empty parameters
      params = Object.fromEntries(Object.entries(params).filter(([key, value]) => value != null && value !== ''));
  
      const headers = { 'Authorization': 'Bearer xX3lfD4060k_S3IXvSE3Vw' }; // Use your API key directly
  
      const response = await axios.get('https://nubela.co/proxycurl/api/search/person/', { params, headers });
      res.json(response.data);
    } catch (error) {
      console.error('Error when calling the Proxycurl API:', error.response?.data || error.message);
      res.status(500).json({ error: error.toString() });
    }
  };