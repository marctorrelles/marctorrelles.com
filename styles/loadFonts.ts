import FontFaceObserver from 'fontfaceobserver'

const loadFonts = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700'
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const ubuntu = new FontFaceObserver('Ubuntu')

  ubuntu.load().then(() => {
    document.documentElement.classList.add('ubuntu')
  })
}

export default loadFonts
