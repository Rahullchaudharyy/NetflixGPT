export const AVATAR_IMAGE = 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'

const API_OPTIONS = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2Q4ZWE4MTVlMjRjNjg1MDM0MWJkNDUyNDY0ODlkMCIsIm5iZiI6MTcyNjY0MDQwMC4xOTk3NDcsInN1YiI6IjY2ZWE3MDBhYjI5MTdlYjE4MDBiNGY1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IeSb5i9RhvDBH1E5GRW4O8VME18DoF0DxRLlFQpSeTg',
      'accept': 'application/json'
    }
  }

  const CDN_IMG_PATH = 'https://image.tmdb.org/t/p/w500'
    
export {API_OPTIONS,CDN_IMG_PATH}
// Make this provate