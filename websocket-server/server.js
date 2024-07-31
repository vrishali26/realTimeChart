const io = require('socket.io')(3000, {
  cors: {
    origin: '*',  // Allow any origin for simplicity
  }
});
const axios = require('axios');

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Function to make an API call and emit the data to the client
  const fetchDataAndEmit = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');  // Replace with your API URL
      const data = response.data;
      socket.emit('newData', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data and emit every second
  const intervalId = setInterval(fetchDataAndEmit, 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(intervalId);
  });
});
