const airing_today_url = "https://api.themoviedb.org/3/tv/airing_today?api_key=3d812b53e8327e3496dbe05fb820cf0d"
const on_the_air_url = "https://api.themoviedb.org/3/tv/on_the_air?api_key=3d812b53e8327e3496dbe05fb820cf0d"
const top_rated_url = "https://api.themoviedb.org/3/tv/top_rated?api_key=3d812b53e8327e3496dbe05fb820cf0d"
const populartv_url = "https://api.themoviedb.org/3/tv/popular?api_key=3d812b53e8327e3496dbe05fb820cf0d"

const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/tvshows',async(req,res)=>{
    const airing_today_url = "https://api.themoviedb.org/3/tv/airing_today?api_key=3d812b53e8327e3496dbe05fb820cf0d"
    const on_the_air_url = "https://api.themoviedb.org/3/tv/on_the_air?api_key=3d812b53e8327e3496dbe05fb820cf0d"
    const top_rated_url = "https://api.themoviedb.org/3/tv/top_rated?api_key=3d812b53e8327e3496dbe05fb820cf0d"
    const populartv_url = "https://api.themoviedb.org/3/tv/popular?api_key=3d812b53e8327e3496dbe05fb820cf0d"

    const airingResponse = await axios.get(airing_today_url)
    const otairResponse = await axios.get(on_the_air_url)
    const topResponse = await axios.get(top_rated_url)
    const popularResponse = await axios.get(populartv_url)

    res.render('tvshows',{p: popularResponse.data.results, onair: otairResponse.data.results,tr: topResponse.data.results, at: airingResponse.data.results})

})

router.get('/tvshows/airing_today/all',async(req,res)=>{
    const airing_today_url = "https://api.themoviedb.org/3/tv/airing_today?api_key=3d812b53e8327e3496dbe05fb820cf0d"
    const airingResponse = await axios.get(airing_today_url)

    const title = "Airing Today TV Shows"
    res.render('all',{res: airingResponse.data.results, title})
})
router.get('/tvshows/on_the_air/all',async(req,res)=>{
    const on_the_air_url = "https://api.themoviedb.org/3/tv/on_the_air?api_key=3d812b53e8327e3496dbe05fb820cf0d"
    const otairResponse = await axios.get(on_the_air_url)

    const title = "On The Air TV Shows"
    res.render('all',{res:otairResponse.data.results, title})
})
router.get('/tvshows/top_rated/all',async(req,res)=>{
    const top_rated_url = "https://api.themoviedb.org/3/tv/top_rated?api_key=3d812b53e8327e3496dbe05fb820cf0d"
    const topResponse = await axios.get(top_rated_url)

    const title = "Top Rated TV Shows"
    res.render('all',{res:topResponse.data.results, title})
})
router.get('/tvshows/popular/all',async(req,res)=>{
    const populartv_url = "https://api.themoviedb.org/3/tv/popular?api_key=3d812b53e8327e3496dbe05fb820cf0d"
    const popularResponse = await axios.get(populartv_url)

    const title = "Popular TV Shows"
    res.render('all',{res:popularResponse.data.results, title})
})


router.get('/tvshows/:id/details',async(req,res)=>{
    const {id} = req.params

    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=3d812b53e8327e3496dbe05fb820cf0d`;
    const dr = await axios.get(url);

    const casturl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=3d812b53e8327e3496dbe05fb820cf0d`;
    const cr = await axios.get(casturl);

    const trailerUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=3d812b53e8327e3496dbe05fb820cf0d`;
    const tr = await axios.get(trailerUrl);

    res.render('details',{cast:cr.data.cast, title:dr.data.original_title, overview:dr.data.overview , rating:dr.data.popularity , image:dr.data.poster_path , genres:dr.data.genres, trailer:tr.data.results})
})


module.exports = router;