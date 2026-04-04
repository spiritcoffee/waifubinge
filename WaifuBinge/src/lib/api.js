import axios from 'axios'

const BASE_URL = 'https://api.jikan.moe/v4'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

/**
 * Fetch top anime
 * @param {number} page
 * @param {number} limit
 */
export async function fetchTopAnime(page = 1, limit = 24) {
  const { data } = await api.get('/top/anime', {
    params: { page, limit },
  })
  return data
}

/**
 * Search anime by query string
 * @param {string} query
 * @param {number} page
 * @param {number} limit
 */
export async function searchAnime(query, page = 1, limit = 24) {
  const { data } = await api.get('/anime', {
    params: { q: query, page, limit, sfw: true },
  })
  return data
}

/**
 * Fetch anime by genre(s)
 * @param {number|string} genreIds - comma-separated genre IDs
 * @param {number} page
 * @param {number} limit
 */
export async function fetchAnimeByGenre(genreIds, page = 1, limit = 24) {
  const { data } = await api.get('/anime', {
    params: { genres: genreIds, page, limit, sfw: true, order_by: 'score', sort: 'desc' },
  })
  return data
}

/**
 * Fetch a single anime by its MAL ID
 * @param {number} id
 */
export async function fetchAnimeById(id) {
  const { data } = await api.get(`/anime/${id}`)
  return data
}
