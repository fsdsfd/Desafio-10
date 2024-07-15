import './style.css'
// Ejercicio 1
 const urlChistes = 'https://icanhazdadjoke.com/'
 const contenedor = document.querySelector('#contenedor')
 const btnChistes = document.querySelector('#btn-chistes')
 async function getChiste(urlChiste) {
     try {
       const options = {
         headers :{
         'Accept': 'application/json'
       }
     }
       const chiste = await fetch(urlChiste, options);
       console.log(chiste)
       if (!chiste.ok) {
         throw new Error('Error al enviar el chiste', urlChiste.status)
       }
       const data = await chiste.json()
       console.log(data)
       contenedor.innerText = data.joke
     } catch (error) {
       console.log('getChiste', error)
     }
 }

 btnChistes.addEventListener('click',(event)=>{
   event.preventDefault()
   getChiste(urlChistes)
 })

//  Ejercicio 2

 const urlBlog = 'https://jsonplaceholder.typicode.com/posts'
const contenedorBlogs = document.querySelector('#blogs')

async function getBlog(urlBlogs) {
  try {
    const blog = await fetch(urlBlogs)
    if (!blog.ok) {
      throw new Error('Error al enviar el blog', blog.status)
    }
    const data = await blog.json()
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      const titulo = data[i].title
      const bajada = data[i].body
      const h1 = document.createElement('h1')
      const p = document.createElement('p')
      h1.innerText = titulo
      p.innerText = bajada
      contenedorBlogs.appendChild(h1)
      contenedorBlogs.appendChild(p)
    }
  } catch (error) {
    console.log('getBlog', error)
  }
}
getBlog(urlBlog)

// Ejercicio 3

const urlPeliculas = 'http://www.omdbapi.com/'
 const form = document.querySelector('#form')
 const inputPelicula = document.querySelector('#pelicula')
 const divPeliculas = document.querySelector('#peliculas')
 const h1 = document.createElement('h1')
 const p = document.createElement('p')
 const poster = document.createElement('img')
 async function getPeliculas(urlPeliculas, inputPeliculas) {
   try {
     const url = urlPeliculas + `?t=${inputPeliculas}&apikey=${import.meta.env.VITE_API_KEY}&`
     console.log(url)
     const respuesta = await fetch(url)
     if (!respuesta.ok){
       throw new Error('Error al enviar la película', url.status)
     }
     const data = await respuesta.json()
     console.log(data)
     h1.innerText = data.Title
     p.innerText = data.Plot
     poster.src = data.Poster
     if (inputPeliculas.trim() === '') {
      h1.innerText = 'No se admiten caracteres vacios como películas'
      p.innerText = 'Intente de nuevo'
      poster.src = ''
     }
     if (data.Title === undefined) {
       h1.innerText = 'Pelicula no encontrada'
       p.innerText = 'Intente de nuevo'
       poster.src = ''
     }
     divPeliculas.appendChild(h1)
     divPeliculas.appendChild(p)
     divPeliculas.appendChild(poster)

   } catch (error) {
     console.log('urlPeliculas', error)
   }
 }
 form.addEventListener('submit', (event)=>{
   event.preventDefault()
   const pelicula = inputPelicula.value
   getPeliculas(urlPeliculas, pelicula)
 })

// Ejercicio 4
const urlUnplash = 'https://api.unsplash.com/search/photos'
const inputUnplashUsuario = document.querySelector('#unplash')
const formUnplash = document.querySelector('#form-unplash')
const h1Unplash = document.createElement('h1')
const divUnplash = document.querySelector('#unplash-container')
async function getUnplash(inputUnplash) {
  try {
    const urlUnplashAPI =  urlUnplash + `?query=${inputUnplash}&client_id=${import.meta.env.VITE_ACCESS_KEY}`
    console.log(urlUnplashAPI)
    const respuesta = await fetch(urlUnplashAPI)
    if (inputUnplash.trim() === '') {
      h1Unplash.innerText = 'No se admiten carácteres vacios como busqueda'
      divUnplash.appendChild(h1Unplash)
    }
    if (!respuesta.ok) {
      throw new Error('No se pudo enviar el resultado de la busqueda', respuesta.status)
    }
    const data = await respuesta.json()
    console.log(data)
    if (data.total === 0) {

      h1Unplash.innerText = 'No se encontró resultado para esa imagen'
      divUnplash.appendChild(h1Unplash)
    }
    console.log(data.results[0].urls.small)

    const img = document.createElement('img')
    const img2 = document.createElement('img')
    const img3 = document.createElement('img')
    const img4 = document.createElement('img')

    img.src = data.results[0].urls.small
    img2.src = data.results[1].urls.small
    img3.src = data.results[2].urls.small
    img4.src = data.results[3].urls.small
    divUnplash.appendChild(img)
    divUnplash.appendChild(img2)
    divUnplash.appendChild(img3)
    divUnplash.appendChild(img4)
  } catch (error) {
    console.log('getUnplash', error)
  }
}
formUnplash.addEventListener('submit', (event)=>{
  event.preventDefault()
  const inputUsuario = inputUnplashUsuario.value
  getUnplash(inputUsuario)
})
