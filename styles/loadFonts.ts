import FontFaceObserver from "fontfaceobserver"

const loadFonts = async () => {
  const loraLink = document.createElement("link")
  loraLink.href =
    "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700"
  loraLink.rel = "stylesheet"

  const dmMonoLink = document.createElement("link")
  dmMonoLink.href =
    "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700"
  dmMonoLink.rel = "stylesheet"

  const poppinsLink = document.createElement("link")
  poppinsLink.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700"
  poppinsLink.rel = "stylesheet"

  document.head.appendChild(loraLink)
  document.head.appendChild(dmMonoLink)
  document.head.appendChild(poppinsLink)

  const lora = new FontFaceObserver("Lora")
  const dmMono = new FontFaceObserver("DM Mono")
  const poppins = new FontFaceObserver("Poppins")

  try {
    await lora.load()
    await dmMono.load()
    await poppins.load()
  } catch (error) {
    console.log(error)
  } finally {
    return
  }
}

export default loadFonts
