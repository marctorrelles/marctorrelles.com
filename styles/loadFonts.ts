import FontFaceObserver from "fontfaceobserver"

const loadFonts = async () => {
  const link = document.createElement("link")
  link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700"
  link.rel = "stylesheet"

  document.head.appendChild(link)

  const ubuntu = new FontFaceObserver("Lora")

  try {
    await ubuntu.load()
  } catch (error) {
    console.log(error)
  } finally {
    return
  }
}

export default loadFonts
