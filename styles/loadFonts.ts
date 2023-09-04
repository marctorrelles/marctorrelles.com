import FontFaceObserver from "fontfaceobserver"

const loadFonts = async () => {
  const link = document.createElement("link")
  link.href = "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700"
  link.rel = "stylesheet"

  document.head.appendChild(link)

  const ubuntu = new FontFaceObserver("Ubuntu")

  try {
    await ubuntu.load()
  } catch (error) {
    console.log(error)
  } finally {
    return
  }
}

export default loadFonts
