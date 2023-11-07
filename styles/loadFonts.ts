import FontFaceObserver from "fontfaceobserver"

const loadFonts = async () => {
  const loraLink = document.createElement("link")
  loraLink.href =
    "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700"
  loraLink.rel = "stylesheet"

  const ubuntuMonoLink = document.createElement("link")
  ubuntuMonoLink.href =
    "https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;500;700"
  ubuntuMonoLink.rel = "stylesheet"

  const poppinsLink = document.createElement("link")
  poppinsLink.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700"
  poppinsLink.rel = "stylesheet"

  document.head.appendChild(loraLink)
  document.head.appendChild(ubuntuMonoLink)
  document.head.appendChild(poppinsLink)

  const lora = new FontFaceObserver("Lora")
  const ubuntuMono = new FontFaceObserver("Ubuntu Mono")
  const poppins = new FontFaceObserver("Poppins")

  try {
    await lora.load()
    await ubuntuMono.load()
    await poppins.load()
  } catch (error) {
    console.log(error)
  } finally {
    return
  }
}

export default loadFonts
