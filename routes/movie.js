if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
  }

const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/movie',async(req,res)=>{
    const upcoming_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`
    const uresponse = await axios.get(upcoming_url)

    const popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    const presponse = await axios.get(popular_url)

    const toprated_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
    const topresponse = await axios.get(toprated_url)
    
    const nowplaying_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`
    const npresponse = await axios.get(nowplaying_url)

    res.render('movies',{ures : uresponse, pres : presponse, topres : topresponse, npres : npresponse})
})

router.get('/movie/upcoming/all',async(req,res)=>{
    const upcoming_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`
    const uresponse = await axios.get(upcoming_url)

    const title = "Upcoming Movies"
    res.render('all',{res : uresponse.data.results, title})

})
router.get('/movie/top_rated/all',async(req,res)=>{
    const toprated_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
    const topresponse = await axios.get(toprated_url)

    const title = "Top Rated Movies"
    res.render('all',{res : topresponse.data.results, title})
    
})
router.get('/movie/popular/all',async(req,res)=>{
    const popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    const presponse = await axios.get(popular_url)

    const title = "Popular Movie"
    res.render('all',{res: presponse.data.results, title})

})
router.get('/movie/now_playing/all',async(req,res)=>{
    const nowplaying_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`
    const npresponse = await axios.get(nowplaying_url)

    const title = "Now Playing Movie"
    res.render('all',{res:npresponse.data.results, title})

})

router.get('/movie/:id/detail',async(req,res)=>{
    const {id} = req.params;

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`;
    const dr = await axios.get(url);

    const casturl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`;
    const cr = await axios.get(casturl);

    const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}`;
    const tr = await axios.get(trailerUrl);

    res.render('details',{cast:cr.data.cast, title:dr.data.original_title, overview:dr.data.overview , rating:dr.data.popularity , image:dr.data.poster_path , genres:dr.data.genres, trailer:tr.data.results})
})


module.exports = router;