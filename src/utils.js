/* globals XMLHttpRequest */

export function getTextFromUrl (Url) {
  const req = new XMLHttpRequest()
  req.open('GET', Url, false)
  req.send(null)
  if (req.status === 200) {
    return req.responseText
  } else {
    console.error('Failed to load URL:', Url, 'Status:', req.status)
    return null
  }
}

export function copy (x) {
  return null
}
