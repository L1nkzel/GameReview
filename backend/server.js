import Express from 'express';
import 'dotenv/config'

const server = Express();
server.use(Express.json());

const PORT = process.env.PORT

server.get('/:game', (req, res) => {
    const game = req.params.game
    fetch(
        `https://api.rawg.io/api/games?search=${game}&search_precise=true&page_size=30&key=${process.env.API_KEY_RAWG}`
    )
    .then(res => res.json())
    .then(data => res.json(data))
    
})

server.listen(PORT, () => console.log(`Listening on port ${PORT} `))