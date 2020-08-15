import FontFaceObserver from 'fontfaceobserver'

const loadFonts = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono&family=Ubuntu:wght@400;500;700'
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const ubuntu = new FontFaceObserver('Ubuntu')
  const ubuntuMono = new FontFaceObserver('Ubuntu Mono')

  ubuntu.load().then(() => {
    document.documentElement.classList.add('ubuntu')
  })
  ubuntuMono.load().then(() => {
    document.documentElement.classList.add('ubuntu-mono')
  })
}

export default loadFonts
